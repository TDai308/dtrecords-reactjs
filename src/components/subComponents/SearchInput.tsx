import React from "react";

export default function SearchInput() {
    const handleSearch = () => {

    }

    const goToLocation = () => {

    }

    return (
        <div className="search_bar">
            <input id="s" placeholder="Tìm kiếm đĩa than yêu thích của bạn" type="text"
                   className="search_bar__input" onKeyDown={handleSearch}/>
            <button type="button" className="search_bar__button">
                <i className="fas fa-search" onClick={goToLocation}/>
            </button>
        </div>
    );
}