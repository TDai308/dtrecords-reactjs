import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {VinylForCreating} from "../types/Vinyl";
import {Artist} from "../types/Artist";
import {Genre} from "../types/Genre";
import {Nation} from "../types/Nation";
import {artistApi} from "../../api/artistApi";
import {nationApi} from "../../api/nationApi";

const VinylForCreatingDefault : VinylForCreating = {
    vinylName: "",
    artist: {
        id: 0,
        nameArtist: ""
    },
    thumbnail1: "",
    thumbnail2: "",
    quantity: 0,
    price: 0,
    genres: [],
    nation: {
        id: 0,
        nation: ""
    },
    discount: 0
}

export default function AdminCreateVinyl() {
    const [newVinyl, setNewVinyl] = useState<VinylForCreating>(VinylForCreatingDefault);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [nations, setNations] = useState<Nation[]>([]);
    const [creatingSuccessful, setCreatingSuccessful] = useState<boolean>(false);

    const getArtistList = async () => {
      try {
          const fetchArtistList = await artistApi.getArtists();
          setArtists(fetchArtistList.data);
      } catch (error) {
          console.log("error", error);
      }
    };

    const getNationList = async () => {
        try {
            const fetchNationList = await nationApi.getNationList();
            setNations(fetchNationList.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getNationList();
        getArtistList();
    }, []);

    useEffect(() => {
        setNewVinyl({...newVinyl, artist: artists[0]});
    }, [artists]);

    useEffect(() => {
        setNewVinyl({...newVinyl, nation: nations[0]});
    }, [nations]);

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.tagName === "INPUT") {
            setNewVinyl({...newVinyl, [event.currentTarget.name]: event.target.value})
        }
        if (event.target.tagName === "SELECT") {
            if (event.currentTarget.name === "artist") {
                setNewVinyl({...newVinyl, artist: artists.find(artist => artist.id === parseInt(event.target.value))!})
            }
            if (event.currentTarget.name === "nation") {
                setNewVinyl({...newVinyl, nation: nations.find(nation => nation.id === parseInt(event.target.value))!})
            }
        }
    }

    return (
        <form className="admin_page__menu__manager" style={{width: "60%important"}} onSubmit={handleSubmit}>
            <h1>Thêm thông tin sản phẩm mới</h1>
            <Link to="/vinyllist" className="button__blue__with-a">Danh sách sản phẩm</Link>
            {
                creatingSuccessful &&
                <p>New vinyl created successfully</p>
            }
            <label className="has-float-label">
                <input className="sign_up__input" name="vinylName" required type="text" onChange={handleChange}/>
                <span>Tên sản phẩm</span>
            </label>

            <label className="has-float-label">
                <select name="artist" className="sign_up__input" onChange={handleChange}>
                    {
                        artists.map((artist,index) => {
                            return (
                                <option key={index} value= {artist.id}>{artist.nameArtist}</option>
                            );
                        })
                    }
                </select>
                <span>Tên nghệ sĩ</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" name="thumbnail1" required type="text" onChange={handleChange}/>
                <span>Thumbnail 1 *</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" name="thumbnail2" required type="text" onChange={handleChange}/>
                <span>Thumbnail 2 *</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" name="quantity" step="1" min="0" required type="number" onChange={handleChange}/>
                <span>Số lượng *</span>
            </label>

            <label className="has-float-label">
                <input id="input_price" className="sign_up__input" name="price" step="0.01" min="0" required type="number" onChange={handleChange}/>
                <span>Giá</span>
            </label>

            {/*<label className="has-float-label">*/}
            {/*    <select name="genre" className="sign_up__input">*/}
            {/*        <option th:each="genre : ${genreList}"*/}
            {/*                th:value="${genre.genreID}"*/}
            {/*                th:text="${genre.genrename}"*/}
            {/*        ></option>*/}
            {/*    </select>*/}
            {/*    <span>Thể Loại *</span>*/}
            {/*</label>*/}

            <label className="has-float-label">
                <select name="nation" className="sign_up__input" onChange={handleChange}>
                    {
                        nations.map((nation, index) => {
                            return (
                                <option key={index} value={nation.id}>{nation.nation}</option>
                            );
                        })
                    }
                </select>
                <span>Quốc gia</span>
            </label>

            <label className="has-float-label">
                <input id="input_discount" className="sign_up__input" name="discount" step="0.01" min="0" required type="number" onChange={handleChange}/>
                <span>% Giảm Giá</span>
            </label>

            <input className="button_Login_Signup" type="submit" value="Cập nhật thông tin sản phẩm"/>
        </form>
    );
}