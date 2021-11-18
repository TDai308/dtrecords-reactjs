import React, {useContext, useEffect, useState} from "react";
import {Vinyl, VinylDefault} from "../../type/Vinyl";
import {useParams} from "react-router-dom";
import {vinylApi} from "../../../api/vinylApi";
import {Track} from "../../type/Track";
import $ from "jquery";
import {trackApi} from "../../../api/trackApi";
import {CartContext} from "../../context/CartProvider";
import AlbumThumbnailSlider from "./ProductDetailContent/AlbumThumbnailSlider";
import ProductsContentRow from "./productsContentRow";

export default function ProductDetailContent(props:any) {
    const [vinyl, setVinyl] = useState<Vinyl>(VinylDefault);
    const [productContents, setProductContents] = useState<{productTitle:string,vinyls:Vinyl[]}[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const {addToCart} = useContext(CartContext);

    const {id} = useParams<{id:string}>();

    const apiUrlDefault = process.env.REACT_APP_API_URL_DEFAULT;

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
    }

    useEffect(() => {
        getTheVinyl();
        getVinylsSameArtist();
        getVinylsSameGenre();
    }, []);

    useEffect(() => {
        getTrackList();
        document.title = `${vinyl.vinylName} - ${vinyl.artist.nameArtist}`;
        setQuantity(vinyl.quantity>0?1:0);
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

    const handleChangeQuantity = (event:React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.currentTarget.value));
    };

    let defaultQuantity:number = props.location.state.quantity>0?1:0;

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
                                    <div className="album__track_name">
                                        <div>{track.trackName} - {track.artists}</div>
                                    </div>
                                    <div className="album__track_play_pause">
                                        <i  className="fas fa-play-circle" onClick={(event) => {play(index,event)}}/>
                                        <i className="fas fa-pause-circle" onClick={(event) => {pause(index,event)}} style={{
                                            display: "none"
                                        }}/>
                                    </div>
                                    <audio className="audio" id={index.toString()} src={`${apiUrlDefault}${track.trackPreview}`}/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    };

    const getVinylsSameArtist = async () => {
      try {
          const fetchVinylsSameArtist = await vinylApi.getVinylsSameArtist(parseInt(id));
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
            const fetchVinylsSameGenre = await vinylApi.getVinylsSameGenre(parseInt(id));
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

    const renderBuyButton = ():JSX.Element => {
        return (
            <form className="album__buy_button">
                <input className="album__quantity" type="number" name="quantity" defaultValue={defaultQuantity} min={1} max={vinyl.quantity} disabled={vinyl.quantity===0} onChange={handleChangeQuantity}/>
                {
                    vinyl.quantity !== 0 ?
                        <input className="album__add_to_cart height_42px" type="button" value="Thêm Vào Giỏ" onClick={
                            () => {
                                if (quantity>0) {
                                    addToCart({vinyl: vinyl,quantity: quantity});
                                    $(".album__quantity").val(defaultQuantity);
                                }
                            }
                        }/> :
                        <input className="album__sold_out height_42px" type="button" value="Hết Hàng"/>
                }
            </form>
        );
    };

    const renderVinylContent = ():JSX.Element => {
      return (
          <div className="row sm-gutter app-content">
              <div className="col l-6">
                  <AlbumThumbnailSlider thumbnail1={vinyl.thumbnail1} thumbnail2={vinyl.thumbnail2} vinylName={vinyl.vinylName}/>
              </div>
              <div className="col l-6">
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
                <div className={"col l-12"} key={index}>
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