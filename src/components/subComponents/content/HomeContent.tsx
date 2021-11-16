import React, {useEffect, useState} from "react";
import VideoTopAlbum from "./HomeContent/VideoTopAlbum";
import {Vinyl} from "../../type/Vinyl";
import {vinylApi} from "../../../api/vinylApi";
import ProductsContentRow from "./productsContentRow";
import {Genre} from "../../type/Genre";
import GenresItem from "./HomeContent/GenresItem";
import {genreApi} from "../../../api/genreApi";
import {Link} from "react-router-dom";

export default function HomeContent() {
    const [productContents, setProductContents] = useState<{productTitle:string,vinyls:Vinyl[]}[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);

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

    useEffect(() => {
        getBestSellerVinyls();
        getSaleOffVinyls();
        getGenres();
    }, []);

    const renderProductContentRows = (): JSX.Element[] => {
        return productContents.map((productContent, index) => {
            return (
                <ProductsContentRow key={index} productTitle={productContent.productTitle} vinyls={productContent.vinyls} index={index}/>
            );
        })
    }

    const renderGenresList = (): JSX.Element[] => {
        return genres.map((genre,index) => {
            return (
                <div className="col l-4">
                    <GenresItem genre={genre}/>
                </div>
            );
        })
    }

    const renderGenresContent = ():JSX.Element => {
      return (
          <div className="container__content_product--genres">
              <div className="container__content_product--selling__title-link">
                  <h3 className="container__content_product--selling__title">Thể loại</h3>
              </div>
              <div className="grid__row">
                  <div className="col l-4">
                      <Link className="genres_box" to="/products">
                          <div className="genres_box__image_genres">
                              <img src={"http://localhost:8080/images/genres/AllGenre.jpg"} alt="genre" className="genres_box__img"/>
                          </div>
                          <p className="genres_box__title">All</p>
                      </Link>
                  </div>
                  {
                      renderGenresList()
                  }
              </div>
          </div>
    );
    };

    const productsContent = (): JSX.Element => {
        return (
            <div className={"container__content_product"}>
                {
                    renderProductContentRows()
                }
                {
                    renderGenresContent()
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