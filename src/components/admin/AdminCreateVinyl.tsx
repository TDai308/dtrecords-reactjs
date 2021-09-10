import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {VinylForCreating} from "../types/Vinyl";
import {Artist} from "../types/Artist";
import {Genre} from "../types/Genre";
import {Nation} from "../types/Nation";
import {artistApi} from "../../api/artistApi";
import {nationApi} from "../../api/nationApi";
import {genreApi} from "../../api/genreApi";

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
    const [showAddingMenu, setShowAddingMenu] = useState<boolean>(false);
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

    const getGenreList = async () => {
        try {
            const fetchGenreList = await genreApi.getGenreList();
            setGenres(fetchGenreList.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getNationList();
        getArtistList();
        getGenreList();
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

    const handleAddOpenButtonClick = () => {
        setShowAddingMenu(true);
    }

    const handleAddCloseButtonClick = () => {
        setShowAddingMenu(false);
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let genreSelected : Genre[];
        if (event.target.checked) {
            genreSelected = newVinyl.genres.concat({
                id: parseInt(event.currentTarget.value),
                genreName: event.target.name
            });
            setNewVinyl({...newVinyl,genres: genreSelected});
        } else {
            genreSelected = newVinyl.genres;
            const index = genreSelected.map(function (genre) {
                return genre.id
            }).indexOf(parseInt(event.target.value));
            console.log(index);
            if (index !== -1) {
                genreSelected.splice(index,1);
            }
            setNewVinyl({...newVinyl,genres: genreSelected});
        }
    }

    return (
        <form className="admin_page__menu__manager" style={{width: "60%"}} onSubmit={handleSubmit}>
            <h1>Thêm thông tin sản phẩm mới</h1>
            <Link to="/admin/vinyl" className="button__blue__with-a">Danh sách sản phẩm</Link>
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
                <span>Thumbnail 1</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" name="thumbnail2" required type="text" onChange={handleChange}/>
                <span>Thumbnail 2</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" name="quantity" step="1" min="0" required type="number" onChange={handleChange}/>
                <span>Số lượng</span>
            </label>

            <label className="has-float-label">
                <input id="input_price" className="sign_up__input" name="price" step="0.01" min="0" required type="number" onChange={handleChange}/>
                <span>Giá</span>
            </label>

            <label className="has-float-label">
                <div className="sign_up__input" style={{
                    paddingLeft: "100px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center"
                }}>
                    {
                        newVinyl.genres.map((genre, index) => {
                            return (
                                <div className="adminPageVinyl__genreItem">
                                    <div>{genre.genreName}</div>
                                    <svg height="13pt" viewBox="0 0 512 512" width="13pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#f44336"/><path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" fill="#fafafa"/></svg>
                                </div>
                            );
                        })
                    }
                    <div className="button--adding" onClick={handleAddOpenButtonClick}>+</div>
                </div>
                <span>Thể Loại</span>
            </label>

            <div className="adminPageVinyl__selectMenuGenres" style={{display: showAddingMenu?"flex":"none"}}>
                {
                    genres.map((genre,index) => {
                        return (
                            <label className={"adminPage__selectMenu__selectInput"} key={index}>
                                <input type="checkbox" value={genre.id} name={genre.genreName} onChange={handleSelectChange}/>
                                {genre.genreName}
                            </label>
                        );
                    })
                }
                <input type="button" value={"đóng"} className={"adminPage__selectMenu--closeButton"} onClick={handleAddCloseButtonClick}/>
            </div>

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