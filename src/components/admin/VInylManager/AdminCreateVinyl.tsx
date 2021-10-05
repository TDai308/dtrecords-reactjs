import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {VinylForCreating} from "../../type/Vinyl";
import {Artist} from "../../type/Artist";
import {Genre} from "../../type/Genre";
import {Nation} from "../../type/Nation";
import {artistApi} from "../../../api/artistApi";
import {nationApi} from "../../../api/nationApi";
import {genreApi} from "../../../api/genreApi";
import {vinylApi} from "../../../api/vinylApi";
import {UserContext} from "../../context/UserProvider";
import {VinylForCreatingDefault} from "../../type/Vinyl";
import $ from "jquery";

export default function AdminCreateVinyl() {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [nations, setNations] = useState<Nation[]>([]);
    const [newVinyl, setNewVinyl] = useState<VinylForCreating>(VinylForCreatingDefault);
    const [thumbnail1, setThumbnail1] = useState<File>();
    const [thumbnail2, setThumbnail2] = useState<File>();
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
        VinylForCreatingDefault.artist = artists[0];
    }, [artists]);

    useEffect(() => {
        setNewVinyl({...newVinyl, nation: nations[0]});
        VinylForCreatingDefault.nation = nations[0];
    }, [nations]);

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.tagName === "INPUT") {
            setNewVinyl({...newVinyl, [event.currentTarget.name]: event.target.value});
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

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameInput = event.target.name;
        if (nameInput === "thumbnail1") {
            $('#file__input--thumbnail1').text(event.target.files?.[0].name!);
            setThumbnail1(event.target.files?.[0]);
        }
        if (nameInput === "thumbnail2") {
            $('#file__input--thumbnail2').text(event.target.files?.[0].name!);
            setThumbnail2(event.target.files?.[0]);
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
            if (index !== -1) {
                genreSelected.splice(index,1);
            }
            setNewVinyl({...newVinyl,genres: genreSelected});
        }
    }

    const {refreshToken} = useContext(UserContext);

    const handleAddNewVinyl = async () => {
        try {
            await vinylApi.addNewVinyl(newVinyl, thumbnail1, thumbnail2);
            setCreatingSuccessful(true);
            setNewVinyl(VinylForCreatingDefault);
            // const artistInput = document.getElementById("artistInput") as HTMLSelectElement;
            // artistInput.selectedIndex = 0;
            // const nationInput = document.getElementById("nationInput") as HTMLSelectElement;
            // nationInput.selectedIndex = 0;
            $("#artistInput").prop('selectedIndex', 0);
            $("#nationInput").prop('selectedIndex', 0);
        } catch (error) {
            if (error.response.status === 403) {
                await refreshToken();
                handleAddNewVinyl();
            } else {
                console.log("error", error);
            }
        }
    }

    return (
        <form className="admin_page__menu__manager" style={{width: "60%"}} onSubmit={handleSubmit}>
            <h1>Thêm thông tin sản phẩm mới</h1>
            <Link to="/admin/vinyl" className="button__blue__with-a">Danh sách sản phẩm</Link>
            {
                creatingSuccessful &&
                <p>Sản phẩm mới đã được thêm</p>
            }
            <label className="has-float-label">
                <input className="sign_up__input" name="vinylName" required type="text" value={newVinyl.vinylName} onChange={handleChange}/>
                <span>Tên sản phẩm</span>
            </label>

            <label className="has-float-label">
                <select id={"artistInput"} name="artist" className="sign_up__input" onChange={handleChange}>
                    {
                        artists.map((artist,index) => {
                            return (
                                <option key={index} value={artist.id}>{artist.nameArtist}</option>
                            );
                        })
                    }
                </select>
                <span>Nghệ sĩ</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" id={"thumbnail1"} name="thumbnail1" required type="file" accept={"image/png, image/jpeg"} onChange={handleChangeImage}/>
                <div className={"file__input"}>
                    <span id={"file__input--thumbnail1"}>None</span>
                </div>
                <label htmlFor="thumbnail1">
                    <i className="fas fa-upload"/> Choose a file...
                </label>
                <span style={{
                    transform: "translateX(10px) translateY(-24px)"
                }}>Thumbnail 1</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" id={"thumbnail2"} name="thumbnail2" required type="file" accept={"image/png, image/jpeg"} onChange={handleChangeImage}/>
                <div className={"file__input"}>
                    <span id={"file__input--thumbnail2"}>None</span>
                </div>
                <label htmlFor="thumbnail2">
                    <i className="fas fa-upload"/> Choose a file...
                </label>
                <span style={{
                    transform: "translateX(10px) translateY(-24px)"
                }}>Thumbnail 2</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" name="quantity" step="1" min="0" required type="number" value={newVinyl.quantity} onChange={handleChange}/>
                <span>Số lượng</span>
            </label>

            <label className="has-float-label">
                <input id="input_price" className="sign_up__input" name="price" step="0.01" min="0" required type="number" value={newVinyl.price} onChange={handleChange}/>
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
                                <div key={index} className="adminPageVinyl__genreItem">
                                    <div>{genre.genreName}</div>
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
                                <input type="checkbox" checked={
                                    newVinyl.genres.map(function (genre) {
                                        return genre.id
                                    }).indexOf(genre.id) !== -1
                                } value={genre.id} name={genre.genreName} onChange={handleSelectChange}/>
                                {genre.genreName}
                            </label>
                        );
                    })
                }
                <input type="button" value={"đóng"} className={"adminPage__selectMenu--closeButton"} onClick={handleAddCloseButtonClick}/>
            </div>

            <label className="has-float-label">
                <select name="nation" className="sign_up__input" id={"nationInput"} onChange={handleChange}>
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
                <input id="input_discount" className="sign_up__input" name="discount" step="0.01" min="0" required type="number" value={newVinyl.discount} onChange={handleChange}/>
                <span>% Giảm Giá</span>
            </label>

            <input className="button_Login_Signup" type="submit" value="Cập nhật thông tin sản phẩm" onClick={handleAddNewVinyl}/>
        </form>
    );
}