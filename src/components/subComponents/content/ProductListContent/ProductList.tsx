import React, {useEffect, useState} from "react";
import {Vinyl} from "../../../type/Vinyl";
import ProductItem from "../ProductItem";
import {vinylApi} from "../../../../api/vinylApi";
import {useHistory, useLocation, useParams} from "react-router-dom";
import classNames from "classnames";

export default function ProductList() {
    const location = useLocation();
    let query = new URLSearchParams(location.search);

    const history = useHistory();

    const {productsOption} = useParams<{productsOption:string}>();
    const currentPath = window.location.pathname;

    const [vinyls, setVinyls] = useState<Vinyl[]>([]);
    const [vinylsPerPage] = useState<number>(12);
    const [currentPage, setCurrentPage] = useState<number>(query.get("page")===null?1:parseInt(query.get("page")!));
    const [sortByAndDir, setSortByAndDir] = useState<string|null>(query.get("sort")===null&&query.get("direction")===null?null:`sort=${query.get("sort")!}&direction=${query.get("direction")!}`);
    const [productOption, setProductOption] = useState<string|undefined>(productsOption===undefined?undefined:productsOption);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);

    const getVinyls = async () => {
        try {
            const fetchVinylList = await vinylApi.getVinylList(currentPage,sortByAndDir,productsOption);
            const {data} = fetchVinylList;
            if (data.content.length > 0) {
                setVinyls(data.content);
                setTotalPages(data.totalPages);
                setTotalElements(data.totalElements);
                setCurrentPage(data.number + 1);
            } else {
                setVinyls([]);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (productsOption !== undefined) {
            setProductOption(productsOption);
        } else setProductOption(undefined);
        setCurrentPage(query.get("page")===null?1:parseInt(query.get("page")!));
        setSortByAndDir(query.get("sort")===null&&query.get("direction")===null?null:`sort=${query.get("sort")!}&direction=${query.get("direction")!}`)
    },[location]);

    useEffect(() => {
        getVinyls();
    },[currentPage,sortByAndDir,productOption]);

    const handleFirstPage = () => {
        let firstPage = 1;
        if (currentPage > firstPage) {
            if (sortByAndDir !== null) {
                history.push(`${currentPath}?page=${firstPage}&${sortByAndDir}`);
            } else history.push(`${currentPath}?page=${firstPage}`);
        }
    }

    const handlePrevPage = () => {
        let prevPage = 1;
        if (currentPage > prevPage) {
            if (sortByAndDir !== null) {
                history.push(`${currentPath}?page=${currentPage - prevPage}&${sortByAndDir}`);
            } else history.push(`${currentPath}?page=${currentPage - prevPage}`);
        }
    }

    const handleLastPage = () => {
        let condition = Math.ceil(totalElements/ vinylsPerPage);
        if (currentPage < condition) {
            if (sortByAndDir !== null) {
                history.push(`${currentPath}?page=${condition}&${sortByAndDir}`);
            } else history.push(`${currentPath}?page=${condition}`);
        }
    }

    const handleNextPage = () => {
        if (currentPage < Math.ceil(totalElements / vinylsPerPage)) {
            if (sortByAndDir !== null) {
                history.push(`${currentPath}?page=${currentPage + 1}&${sortByAndDir}`);
            } else history.push(`${currentPath}?page=${currentPage + 1}`);
        }
    }

    const handleChangePage = (event :  React.ChangeEvent<HTMLInputElement>) => {
        let targetPage = parseInt(event.target.value);
        if (sortByAndDir !== null) {
            history.push(`${currentPath}?page=${targetPage}&${sortByAndDir}`);
        } else history.push(`${currentPath}?page=${targetPage}`);
    }

    const handleSortProducts = (event:React.ChangeEvent<HTMLSelectElement>) => {
        history.push(`${currentPath}?${event.target.value}`);
    }

    return (
        <div className="home_produce">
            <div className="home_produce__category">
                <div className="home_produce__category__sortBy">
                    Sắp xếp theo:
                    <form id="form_sort">
                        <select name="sort__selector" value={sortByAndDir===null?"sort=id&direction=asc":sortByAndDir} onChange={handleSortProducts} className="sort__selector">
                            <option value={"sort=id&direction=asc"}>Cũ nhất</option>
                            <option value={"sort=id&direction=desc"}>Mới nhất</option>
                            <option value={"sort=realPrice&direction=asc"}>Giá thấp đến cao</option>
                            <option value={"sort=realPrice&direction=desc"}>Giá cao đến thấp</option>
                        </select>
                    </form>
                </div>
                {totalElements > 12 &&
                <div>
                    <button disabled={currentPage === 1} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== 1})} onClick={handlePrevPage}>
                        <i className="fas fa-angle-left"/> Prev
                    </button>
                    <button disabled={currentPage === totalPages} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== totalPages})} onClick={handleNextPage}>
                        <i className="fas fa-angle-right"/> Next
                    </button>
                </div>
                }
            </div>
            <div className="home_produce__list">
                <div className="grid__row">
                    {
                        vinyls.map((vinyl,index) => {
                        return(
                          <div key={index} className={"col l-3"}>
                              {
                                ProductItem(vinyl)
                              }
                          </div>
                        );
                    })
                    }
                </div>
                {
                    totalElements > 12 &&
                    <div className="home_produce__category__pagination display_flex--space-between">
                        <div>
                            Showing Page {currentPage} of {totalPages}
                        </div>

                        <div className={"display_flex--space-between"}>
                            <div className={"display_flex--center pagination__buttons"}>
                                <button disabled={currentPage === 1} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== 1})} onClick={handleFirstPage}>
                                    <i className="fas fa-angle-double-left"/> First
                                </button>
                                <button disabled={currentPage === 1} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== 1})} onClick={handlePrevPage}>
                                    <i className="fas fa-angle-left"/> Prev
                                </button>
                            </div>

                            <input type="number" name={"currentPage"} className={"pagination__inputPage"} style={
                                {
                                    background: "var(--background-color)"
                                }
                            } value={currentPage} max={totalPages} min={1} onChange={handleChangePage}/>

                            <div className={"display_flex--center pagination__buttons"}>
                                <button disabled={currentPage === totalPages} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== totalPages})} onClick={handleNextPage}>
                                    <i className="fas fa-angle-right"/> Next
                                </button>
                                <button disabled={currentPage === totalPages} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== totalPages})} onClick={handleLastPage}>
                                    <i className="fas fa-angle-double-right"/> Last
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
);
}