import React, {useEffect, useState} from "react";
import VideoTopAlbum from "./HomeContent/VideoTopAlbum";
import {Vinyl} from "../../type/Vinyl";
import {vinylApi} from "../../../api/vinylApi";
import {Genre} from "../../type/Genre";
import {genreApi} from "../../../api/genreApi";
import ProductsContent from "./HomeContent/ProductsContent";
import {Artist} from "../../type/Artist";
import Banner from "./HomeContent/Banner";
import {artistApi} from "../../../api/artistApi";

export default function HomeContent() {
    const [productContents, setProductContents] = useState<{productTitle:string,vinyls:Vinyl[]}[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);

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

    const getGenres = async () => {
        try {
            const fetchGenres = await genreApi.getGenreList();
            setGenres(fetchGenres.data);
        } catch (error) {
            console.log("error",error);
        }
    };

    const get5RandomArtist = async () => {
       try {
           const fetch5RandomArtist = await artistApi.get5RandomArtists();
           setArtists(fetch5RandomArtist.data);
       } catch (error) {
           console.log("error", error);
       }
    }

    useEffect(() => {
        getBestSellerVinyls();
        getSaleOffVinyls();
        getGenres();
        get5RandomArtist();
    }, []);

    return (
        <div>
            <VideoTopAlbum/>
            <div className={"row sm-gutter container__content_product--main"}>
                <div className={"col l-8"}>
                    <ProductsContent productContents={productContents} genres={genres}/>
                </div>
                <div className={"col l-4"}>
                    <Banner artists={artists}/>
                </div>
            </div>
        </div>
    );
}