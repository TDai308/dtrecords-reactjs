import React from "react";
import classNames from "classnames";

export default function CategoryPagination(currentPage:number, totalPages:number) {
    const handleFirstPage = () => {

    }

    const handlePrevPage = () => {

    }

    const handleLastPage = () => {

    }

    const handleNextPage = () => {

    }

    const handleChangePage = () => {

    }

    return (
        <div className="home_produce__category__pagination display_flex--space-between">
            <div>
                Showing Page {currentPage} of {totalPages}
            </div>

            <div className={"display_flex--center"}>
                <div className={"display_flex--center"}>
                    <button disabled={currentPage === 1} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== 1})} onClick={handleFirstPage}>
                        <i className="fas fa-angle-double-left"/> First
                    </button>
                    <button disabled={currentPage === 1} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== 1})} onClick={handlePrevPage}>
                        <i className="fas fa-angle-left"/> Prev
                    </button>
                </div>

                <input type="number" name={"currentPage"} className={"pagination__inputPage"} value={currentPage} max={totalPages} min={1} onChange={handleChangePage}/>

                <div className={"display_flex--center"}>
                    <button disabled={currentPage === totalPages} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== totalPages})} onClick={handleNextPage}>
                        <i className="fas fa-angle-right"/> Next
                    </button>
                    <button disabled={currentPage === totalPages} className={classNames("pagination__button",{"cursor-pointer pagination__button--hover" : currentPage !== totalPages})} onClick={handleLastPage}>
                        <i className="fas fa-angle-double-right"/> Last
                    </button>
                </div>
            </div>
        </div>
    );
}