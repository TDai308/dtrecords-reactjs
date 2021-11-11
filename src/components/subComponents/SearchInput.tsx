import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import $ from "jquery";

export default function SearchInput() {
    const [searchVinyl, setSearchVinyl] = useState<string>("");
    const history = useHistory();
    const location = useLocation();

    const handleSearch = () => {
        history.push(`/products?s=${searchVinyl}`);
    }

    useEffect(() => {
        if (searchVinyl.charAt(searchVinyl.length - 1) === ' ') {
            setSearchVinyl(searchVinyl.substring(0, searchVinyl.length-1));
        }
    }, [searchVinyl]);

    useEffect(() => {
        $("#s").val("");
    }, [location]);

    const handleChangingSearchInput = (event :  React.ChangeEvent<HTMLInputElement>) => {
        setSearchVinyl(event.target.value);
    }

    const handlePressToSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    const handleClickToSearch = () => {
        handleSearch();
    }

    return (
        <div className="search_bar">
            <input id="s" required placeholder="Tìm kiếm đĩa than yêu thích của bạn" type="text"
                   className="search_bar__input" onKeyDown={handlePressToSearch} onChange={handleChangingSearchInput}/>
            <button type="button" className="search_bar__button">
                <i className="fas fa-search" onClick={handleClickToSearch}/>
            </button>
        </div>
    );
}