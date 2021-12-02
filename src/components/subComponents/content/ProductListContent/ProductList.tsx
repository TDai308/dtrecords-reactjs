import React, {useEffect, useState} from "react";
import {Vinyl} from "../../../type/Vinyl";
import ProductItem from "../ProductItem";
import {vinylApi} from "../../../../api/vinylApi";
import {useHistory, useLocation, useParams} from "react-router-dom";
import classNames from "classnames";
import {renderCategoryList} from "./Category";
import $ from "jquery";

export default function ProductList() {
    const location = useLocation();
    const history = useHistory();
    let query = new URLSearchParams(location.search);

    const {productsOption} = useParams<{productsOption:string}>();
    const currentPath = window.location.pathname;

    const [vinyls, setVinyls] = useState<Vinyl[]>([]);
    const [vinylsPerPage] = useState<number>(12);
    const [currentPage, setCurrentPage] = useState<number>(query.get("page")===null?1:parseInt(query.get("page")!));
    const [sortByAndDir, setSortByAndDir] = useState<string|null>(query.get("sort")===null&&query.get("direction")===null?null:`sort=${query.get("sort")!}&direction=${query.get("direction")!}`);
    const [productOption, setProductOption] = useState<string|undefined>(productsOption===undefined?undefined:productsOption);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [search, setSearch] = useState<string|null>(query.get("s")===null?null:query.get("s"));

    const getVinyls = async () => {
        try {
            let fetchVinylList;
            if (search === null) {
                fetchVinylList = await vinylApi.getVinylList(currentPage,sortByAndDir,productsOption);
            } else {
                fetchVinylList = await vinylApi.getVinylsSearch(currentPage,sortByAndDir,search);
            }
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
        setSortByAndDir(query.get("sort")===null&&query.get("direction")===null?null:`sort=${query.get("sort")!}&direction=${query.get("direction")!}`);
        setSearch(query.get("s")===null?null:query.get("s"));
        $("#productFilters").prop("checked", false);
        $("#productSort").prop("checked", false);
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
    };

    const handlePrevPage = () => {
        let prevPage = 1;
        if (currentPage > prevPage) {
            if (sortByAndDir !== null) {
                history.push(`${currentPath}?page=${currentPage - prevPage}&${sortByAndDir}`);
            } else history.push(`${currentPath}?page=${currentPage - prevPage}`);
        }
    };

    const handleLastPage = () => {
        let condition = Math.ceil(totalElements/ vinylsPerPage);
        if (currentPage < condition) {
            if (sortByAndDir !== null) {
                history.push(`${currentPath}?page=${condition}&${sortByAndDir}`);
            } else history.push(`${currentPath}?page=${condition}`);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(totalElements / vinylsPerPage)) {
            if (sortByAndDir !== null) {
                history.push(`${currentPath}?page=${currentPage + 1}&${sortByAndDir}`);
            } else history.push(`${currentPath}?page=${currentPage + 1}`);
        }
    };

    const handleChangePage = (event :  React.ChangeEvent<HTMLInputElement>) => {
        let targetPage = parseInt(event.target.value);
        if (sortByAndDir !== null) {
            history.push(`${currentPath}?page=${targetPage}&${sortByAndDir}`);
        } else history.push(`${currentPath}?page=${targetPage}`);
    };

    const handleSortProducts = (event:React.ChangeEvent<HTMLSelectElement>) => {
        if (search === null) {
            history.push(`${currentPath}?${event.target.value}`);
        } else history.push(`${currentPath}?s=${search}&${event.target.value}`);
    };

    const handleSortProductsWithRadioButton = () => {
        let sortVal = $("input[type='radio'][name='sort']:checked").val();
        if (search === null) {
            history.push(`${currentPath}?${sortVal}`);
        } else history.push(`${currentPath}?s=${search}&${sortVal}`);
    }

    const renderCategory = () => {
        return (
            <div className="home_produce__category__pagination display_flex--space-between">
                <div className={"home_produce__category__pagination__information"}>
                    Showing Page {currentPage} of {totalPages}
                </div>

                <div className={"category__pagination display_flex--space-between"}>
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

                <div className={"category__pagination--mobile-and-tablet"}>
                    <button disabled={currentPage === 1} className={classNames("pagination__button--Mobile-and-Tablet",{"pagination__button--Mobile-and-Tablet--disable" : currentPage === 1})} onClick={handlePrevPage}>
                        <i className="fas fa-caret-left"/>
                    </button>

                    <div>
                        {currentPage} of {totalPages}
                    </div>

                    <button disabled={currentPage === totalPages} className={classNames("pagination__button--Mobile-and-Tablet",{"pagination__button--Mobile-and-Tablet--disable" : currentPage === totalPages})} onClick={handleNextPage}>
                        <i className="fas fa-caret-right"/>
                    </button>
                </div>
            </div>
        );
    };
    
    const renderVinylList = ():JSX.Element[] => {
        return vinyls.map((vinyl,index) => {
            return (
                <div key={index} className={"col l-3 m-4 c-6"}>
                    <ProductItem vinyl={vinyl}/>
                </div>
            );
        })
    };

    const renderProduceCategory = ():JSX.Element => {
        return (
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
                {
                    totalElements > 12 &&
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
        );
    };

    const renderProduceCategoryOnMobileAndTablet = ():JSX.Element => {
        return (
            <div className="home_produce__category--mobile-tablet">
                <label htmlFor={"productFilters"}>
                    Filter
                </label>
                <input hidden type="checkbox" id={"productFilters"}/>
                <div className={"productFilter"}>
                    <div className={"productFilterAndSortHeader display_flex--space-between"}>
                        <h1>Filter</h1>
                        <label htmlFor="productFilters" className={"display_flex--center"}>
                            <i className="fas fa-times"/>
                        </label>
                    </div>
                    <ul className="category__list">
                        {
                            renderCategoryList()
                        }
                    </ul>
                </div>
                <label htmlFor={"productSort"}>
                    Sort
                </label>
                <input hidden type="checkbox" id={"productSort"}/>
                <div className={"productSort"}>
                    <div className={"productFilterAndSortHeader display_flex--space-between"}>
                        <h1>Sort</h1>
                        <label htmlFor="productSort" className={"display_flex--center"}>
                            <i className="fas fa-times"/>
                        </label>
                    </div>
                    <div className={"productFilterAndSortContent"}>
                        <h3>Sắp xếp theo:</h3>
                        <div className={"productSortList"}>
                            <label htmlFor="OldToNew">
                                <input type="radio" id="OldToNew" name="sort" value="sort=id&direction=asc" checked={sortByAndDir===null||sortByAndDir==="sort=id&direction=asc"} onChange={handleSortProductsWithRadioButton}/>
                                <span>Cũ nhất</span>
                            </label>
                            <label htmlFor="NewToOld">
                                <input type="radio" id="NewToOld" name="sort" value="sort=id&direction=desc" checked={sortByAndDir==="sort=id&direction=desc"} onChange={handleSortProductsWithRadioButton}/>
                                <span>Mới nhất</span>
                            </label>
                            <label htmlFor="LowToHigh">
                                <input type="radio" id="LowToHigh" name="sort" value="sort=realPrice&direction=asc" checked={sortByAndDir==="sort=realPrice&direction=asc"} onChange={handleSortProductsWithRadioButton}/>
                                <span>Giá thấp đến cao</span>
                            </label>
                            <label htmlFor="HighToLow">
                                <input type="radio" id="HighToLow" name="sort" value="sort=realPrice&direction=desc" checked={sortByAndDir==="sort=realPrice&direction=desc"} onChange={handleSortProductsWithRadioButton}/>
                                <span>Giá cao đến thấp</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    //product :v
    return (
        <div className="home_produce">
            {
                renderProduceCategory()
            }
            {
                renderProduceCategoryOnMobileAndTablet()
            }
            <div className="home_produce__list">
                <div className="row sm-gutter">
                    {
                        renderVinylList()
                    }
                </div>
                {
                    totalElements > 12 &&
                        renderCategory()
                }
            </div>
        </div>
    );
}