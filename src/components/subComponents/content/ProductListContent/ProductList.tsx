import React, {useEffect, useState} from "react";
import {Vinyl} from "../../../type/Vinyl";
import ProductItem from "../ProductItem";
import {vinylApi} from "../../../../api/vinylApi";

export default function ProductList() {
    const [vinyls, setVinyls] = useState<Vinyl[]>([]);
    const [vinylsPerPage] = useState<number>(10);
    const [currentPage] = useState<number>(1);

    const getVinyls = async () => {
        try {
            const fetchVinylList = await vinylApi.getVinylList(currentPage, vinylsPerPage);
            setVinyls(fetchVinylList.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getVinyls();
    },[])

    return (
        <div className="home_produce">
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
            </div>
        </div>
);
}