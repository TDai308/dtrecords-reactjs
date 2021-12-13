import React from "react";
import {Link} from "react-router-dom";
import {Vinyl} from "../../type/Vinyl";

interface ProductItemInterface {
    vinyl: Vinyl
}

const ProductItem : React.FC<ProductItemInterface> = ({vinyl}) => {
    const genres: string[] = [];
    vinyl.genres.forEach(genre => {
        genres.push(genre.genreName);
    });

    return (
        <Link to={{
            pathname: `/product/${vinyl.id}`,
            state: {quantity: vinyl.quantity}
        }} className="home_produce__item">
            <div className="item__thumbnail_sale_box">
                <img className="home_produce__item__thumbnail" src={`https://dtrecords-api.herokuapp.com/${vinyl.thumbnail1}`} alt={vinyl.vinylName}/>
                <img className="home_produce__item__thumbnail2" src={`https://dtrecords-api.herokuapp.com/${vinyl.thumbnail2}`} alt={vinyl.vinylName}/>
                {
                    vinyl.discount !== 0 &&
                    <div className="sale_box">
                        <p>ON SALE</p>
                    </div>
                }
                {
                    vinyl.quantity === 0 &&
                    <div className="sold_out_box">
                        <p>SOLD OUT</p>
                    </div>
                }
            </div>
            <div className="home_produce__item__information">
                <h2 className="product__name" title={vinyl.vinylName}>{vinyl.vinylName}</h2>
                <p className="product__artist_name" title={vinyl.artist.nameArtist}>{vinyl.artist.nameArtist}</p>
                <div className="product__nation_genre">
                    <span title={vinyl.nation.nation}>{vinyl.nation.nation}</span> - <span title={genres.toString()}>{genres.toString()}</span>
                </div>
                <div className="produce_price">
                    <div>
                        <span className={vinyl.discount === 0?"produce_price_not_sale":"produce_sale_price"}>{vinyl.realPrice}$  </span>
                        {
                            vinyl.discount !== 0 &&
                            <span className="produce_old_price">{vinyl.price}$</span>
                        }
                    </div>
                </div>
                <div className="produce_condition">
                    {
                        vinyl.quantity > 10 &&
                        <span className="produce_in_stock">Có sẵn</span>
                    }
                    {
                        vinyl.quantity > 0 && vinyl.quantity <= 10 &&
                        <span className="produce_left_in_stock-sold_out">Còn {vinyl.quantity} sản phẩm</span>
                    }
                    {
                        vinyl.quantity === 0 &&
                        <span className="produce_left_in_stock-sold_out">Hết hàng</span>
                    }
                </div>
            </div>
        </Link>
);
}

export default ProductItem;