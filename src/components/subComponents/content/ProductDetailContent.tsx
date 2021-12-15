import React, {useContext, useEffect, useState} from "react";
import {Vinyl, VinylDefault} from "../../type/Vinyl";
import {useLocation, useParams} from "react-router-dom";
import {vinylApi} from "../../../api/vinylApi";
import {Track} from "../../type/Track";
import $ from "jquery";
import {trackApi} from "../../../api/trackApi";
import {CartContext} from "../../context/CartProvider";
import AlbumThumbnailSlider from "./ProductDetailContent/AlbumThumbnailSlider";
import ProductsContentRow from "./productsContentRow";

export default function ProductDetailContent() {
    // có thể lấy dữ liệu vinyl dc gửi qua state của location trc khi chuyển đến Link này props.location.state.vinyl
    const [vinyl, setVinyl] = useState<Vinyl>(VinylDefault);
    const [productContents, setProductContents] = useState<{productTitle:string,vinyls:Vinyl[]}[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const {addToCart} = useContext(CartContext);
    const location = useLocation();

    const {id} = useParams<{id:string}>();

    const UrlDefault = process.env["REACT_APP_URL"];

    const getTheVinyl = async () => {
        try {
            const fetchVinylData = await vinylApi.getVinyl(parseInt(id));
            setVinyl(fetchVinylData.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    const getTrackList = async () => {
        try {
            const fetchTrackList = await trackApi.getTrackListOfVinyl(vinyl.id);
            setTracks(fetchTrackList.data);
        } catch (error) {
            console.log("error",error);
        }
    };

    const getVinylsSameArtist = async () => {
        try {
            const fetchVinylsSameArtist = await vinylApi.getVinylsSameArtist(vinyl.id);
            let vinylSameArtist : Vinyl[] = fetchVinylsSameArtist.data;
            if (vinylSameArtist.length !== 0) {
                setProductContents(prevState => {
                    return [...prevState, {
                        productTitle: `Những Album khác của ${vinyl.artist.nameArtist}`,
                        vinyls: vinylSameArtist
                    }]
                });
            }
        } catch (error) {
            console.log("error", error)
        }
    };

    const getVinylsSameGenre = async () => {
        try {
            const fetchVinylsSameGenre = await vinylApi.getVinylsSameGenre(vinyl.id);
            let vinylSameGenre : Vinyl[] = fetchVinylsSameGenre.data;
            if (vinylSameGenre.length !== 0) {
                setProductContents(prevState => {
                    return [...prevState, {
                        productTitle: "Những Album khác bạn có thể thích",
                        vinyls: vinylSameGenre
                    }]
                });
            }
        } catch (error) {
            console.log("error", error);

        }
    };

    const getVinylsSameNation = async () => {
        try {
            const fetchVinylsSameNation = await vinylApi.getVinylsSameNation(vinyl.nation.id,vinyl.id);
            let vinylsSameNation : Vinyl[] = fetchVinylsSameNation.data;
            if (vinylsSameNation.length !== 0) {
                setProductContents(prevState => {
                    return [...prevState, {
                        productTitle: "Những Album tương tự",
                        vinyls: vinylsSameNation
                    }]
                });
            }
        } catch (error) {
            console.log("error", error);

        }
    };

    useEffect(() => {
        getTheVinyl();
        // setVinyl(props.location.state.vinyl);
        setProductContents([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    useEffect(() => {
        getTrackList();
        document.title = `${vinyl.vinylName} - ${vinyl.artist.nameArtist}`;
        setQuantity(vinyl.quantity>0?1:0);
        getVinylsSameArtist();
        getVinylsSameGenre();
        getVinylsSameNation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vinyl]);

    function play(audioID:number, event:React.MouseEvent<HTMLElement>) {
        const audioPlayer = document.getElementById(audioID.toString()) as HTMLMediaElement;
        audioPlayer.play();
        const audios = document.getElementsByClassName('audio') as HTMLCollectionOf<HTMLMediaElement>;
        for(let i = 0; i < audios.length; i++){
            if(audios[i] !== audioPlayer){
                audios[i].pause();
                audios[i].currentTime = 0;
            }
        }
        $('.fa-play-circle').each(function () {
            if ($(this) !== $(event.target)) {
                $(this).css({
                    "display": "block"
                });
                $(this).next().css({
                    "display": "none"
                })
            }
        })
        $(event.target).css({
            "display": "none"
        });
        $(event.target).next().css({
            "display": "block"
        });
    }

    function pause(audioID: number, event:React.MouseEvent<HTMLElement>) {
        const audioPlayer = document.getElementById(audioID.toString()) as HTMLMediaElement;
        audioPlayer.pause();
        $(event.target).css({
            "display": "none"
        });
        $(event.target).prev().css({
            "display": "block"
        });
    }

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(parseInt(event.currentTarget.value));
    };

    const handleAddToCart = () => {
        if (quantity>0 && quantity<=vinyl.quantity) {
            addToCart({vinyl: vinyl,quantity: quantity});
            setQuantity(1);
        }
    }

    const renderAlbumArtist = ():JSX.Element => {
        return (
            <div className="album__artist">
                <div className="album__artist_img_name">
                    <img src={`http://localhost:3000/images/artistImg/${vinyl.artist.nameArtist}.png`} alt={vinyl.artist.nameArtist} className="album__artist_img"/>
                    <p className="album__artist_name">{vinyl.artist.nameArtist}</p>
                </div>
                <div className="album__like">

                </div>
            </div>
        );
    };

    const renderAlbumInformationAndPrice = ():JSX.Element => {
        const genres: string[] = [];
        vinyl.genres.forEach(genre => {
            genres.push(genre.genreName);
        });
        return (
            <div className="album__name_price">
                <h1 className="album__name">{vinyl.vinylName}</h1>
                <h2 className="album__nation_genre">{vinyl.nation.nation} - {genres.toString()}</h2>
                <div className={"produce_price"}>
                    <div>
                        <span className={vinyl.discount === 0?"produce_price_not_sale":"produce_sale_price"}>{vinyl.realPrice} $</span>
                        {
                            vinyl.discount !==0 &&
                            <span className="produce_old_price">{vinyl.price} $</span>
                        }
                    </div>
                </div>
            </div>
        );
    };

    const renderTrackListPlayer = ():JSX.Element => {
        return (
            <div className="album__track-list_player">
                <h2>Danh Sách Các Bài Hát - Preview</h2>
                <div className="album__track-list">
                    {
                        tracks.map((track, index) => {
                            return (
                                <div className="album__track-list__player" key={index}>
                                    <p className={"album__track_name"}>{track.trackName} - {track.artists}</p>
                                    <div className="album__track_play_pause">
                                        <i  className="fas fa-play-circle" onClick={(event) => {play(index,event)}}/>
                                        <i className="fas fa-pause-circle" onClick={(event) => {pause(index,event)}} style={{
                                            display: "none"
                                        }}/>
                                    </div>
                                    <audio className="audio" id={index.toString()} src={`${UrlDefault}${track.trackPreview}`}/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    };

    const renderOptionQuantityList = () => {
        let optionQuantity = [];
        if (vinyl.quantity > 0) {
            for (let quantity = 1; quantity <= vinyl.quantity; quantity++) {
                optionQuantity.push(<option key={quantity} value={quantity}>{quantity}</option>);
            }
        } else optionQuantity.push(<option key={0} value={0}>0</option>);
        return optionQuantity;
    };

    const renderBuyButton = ():JSX.Element => {
        return (
            <form className="album__buy_button">
                <select className={"album__quantity"} name="quantity" value={quantity} disabled={vinyl.quantity===0} onChange={handleChangeQuantity}>
                    {
                        renderOptionQuantityList()
                    }
                </select>
                {/*<input className="album__quantity" type="number" name="quantity" defaultValue={defaultQuantity} min={1} max={vinyl.quantity} disabled={vinyl.quantity===0}/>*/}
                {
                    vinyl.quantity !== 0 ?
                        <input className="album__add_to_cart height_42px" type="button" value="Thêm Vào Giỏ" onClick={handleAddToCart}/> :
                        <input className="album__sold_out height_42px" type="button" value="Hết Hàng"/>
                }
            </form>
        );
    };

    const renderVinylContent = ():JSX.Element => {
      return (
          <div className="row sm-gutter app-content">
              <div className="col l-6 m-12 c-12">
                  <AlbumThumbnailSlider thumbnail1={vinyl.thumbnail1} thumbnail2={vinyl.thumbnail2} vinylName={vinyl.vinylName}/>
              </div>
              <div className="col l-6 m-12 c-12">
                  <div className="album_information">
                      {renderAlbumArtist()}
                      {renderAlbumInformationAndPrice()}
                      {renderTrackListPlayer()}
                      {renderBuyButton()}
                  </div>
              </div>
          </div>
      );
    }

    const renderProductContentRows = (): JSX.Element[] => {
        return productContents.map((productContent, index) => {
            return (
                <div className={"col l-12 m-12 c-12"} key={index}>
                    <ProductsContentRow productTitle={productContent.productTitle} vinyls={productContent.vinyls} index={index}/>
                </div>
            );
        })
    };

    const renderProductContentList = (): JSX.Element => {
        return (
            <div className={"row sm-gutter"}>
                {
                    renderProductContentRows()
                }
            </div>
        );
    }

    return (
        <div>
            {
                renderVinylContent()
            }
            {
                renderProductContentList()
            }
        </div>
    );
}