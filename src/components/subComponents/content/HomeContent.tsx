import React, {useEffect, useState} from "react";
import VideoTopAlbum from "./HomeContent/VideoTopAlbum";
import {Vinyl} from "../../type/Vinyl";
import {vinylApi} from "../../../api/vinylApi";
import ProductsContentRow from "./productsContentRow";

export default function HomeContent() {
    const [productContents, setProductContents] = useState<{productTitle:string,vinyls:Vinyl[]}[]>([]);

    useEffect(() => {
        document.title = "DTrecords";
    }, []);

    const getBestSellerVinyls = async () => {
        try {
            const fetchBestSellerVinyls = await vinylApi.getBestSellerVinyls();
            setProductContents(prevState => {
                return [...prevState, {
                    productTitle: "Sản phẩm bán chạy",
                    vinyls: fetchBestSellerVinyls.data
                }]
            });
        } catch (error) {
            console.log("error",error);
        }
    };

    const getSaleOffVinyls = async () => {
        try {
            const fetchSaleOffVinyls = await vinylApi.getSaleOffVinyls();
            setProductContents(prevState => {
                return [...prevState, {
                    productTitle: "Sản phẩm giảm giá",
                    vinyls: fetchSaleOffVinyls.data
                }]
            })
        } catch (error) {
            console.log("error",error);
        }
    };

    useEffect(() => {
        getBestSellerVinyls();
    }, []);

    useEffect(() => {
        getSaleOffVinyls();
    }, []);

    const renderProductContentRows = (): JSX.Element[] => {
        return productContents.map((productContent, index) => {
            return (
                <ProductsContentRow key={index} productTitle={productContent.productTitle} vinyls={productContent.vinyls} index={index}/>
            );
        })
    }

    const productsContent = (): JSX.Element => {
        return (
            <div className={"container__content_product"}>
                {
                    renderProductContentRows()
                }
            </div>
        );
    };

    return (
        <div>
            <VideoTopAlbum/>
            <div className={"row sm-gutter container__content_product--main"}>
                <div className={"col l-8"}>
                    {
                        productsContent()
                    }
                </div>
            </div>
        </div>
    );
}