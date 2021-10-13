import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {VinylForEditing, VinylForEditingDefault} from "../../type/Vinyl";
import {Artist} from "../../type/Artist";
import {Genre} from "../../type/Genre";
import {Nation} from "../../type/Nation";
import {artistApi} from "../../../api/artistApi";
import {nationApi} from "../../../api/nationApi";
import {genreApi} from "../../../api/genreApi";
import {vinylApi} from "../../../api/vinylApi";
import {UserContext} from "../../context/UserProvider";
import $ from "jquery";

export default function AdminEditVinyl() {
    const apiUrlDefault = process.env.REACT_APP_API_URL_DEFAULT;

    const [vinyl,setVinyl] = useState<VinylForEditing>(VinylForEditingDefault)
    const [artists, setArtists] = useState<Artist[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [nations, setNations] = useState<Nation[]>([]);
    const [thumbnail1, setThumbnail1] = useState<File>();
    const [thumbnail2, setThumbnail2] = useState<File>();
    const [showAddingMenu, setShowAddingMenu] = useState<boolean>(false);
    const [editingSuccessful, setEditingSuccessful] = useState<boolean>(false);

    const {id} = useParams<{id:string}>();
    const {refreshToken} = useContext(UserContext);

    const getVinyl = async () => {
        try {
            const fetchVinyl = await vinylApi.getVinyl(parseInt(id));
            setVinyl(fetchVinyl.data);
        } catch (error) {
            console.log("error", error);
        }
    }

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
        getVinyl();
    }, []);

    const handleAddOpenButtonClick = () => {
        setShowAddingMenu(true);
    }

    const handleAddCloseButtonClick = () => {
        setShowAddingMenu(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.tagName === "INPUT") {
            setVinyl({...vinyl, [event.currentTarget.name]: event.target.value})
        }
        if (event.target.tagName === "SELECT") {
            if (event.currentTarget.name === "artist") {
                setVinyl({...vinyl, artist: artists.find(artist => artist.id === parseInt(event.target.value))!})
            }
            if (event.currentTarget.name === "nation") {
                setVinyl({...vinyl, nation: nations.find(nation => nation.id === parseInt(event.target.value))!})
            }
        }
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let genreSelected : Genre[];
        if (event.target.checked) {
            genreSelected = vinyl.genres.concat({
                id: parseInt(event.currentTarget.value),
                genreName: event.target.name
            });
            setVinyl({...vinyl,genres: genreSelected});
        } else {
            genreSelected = vinyl.genres;
            const index = genreSelected.map(function (genre) {
                return genre.id
            }).indexOf(parseInt(event.target.value));
            if (index !== -1) {
                genreSelected.splice(index,1);
            }
            setVinyl({...vinyl,genres: genreSelected});
        }
    }

    const handleUpdateVinyl = async () => {
        try {
            await vinylApi.updateVinyl(parseInt(id),vinyl,thumbnail1,thumbnail2);
            setEditingSuccessful(true);
        } catch (error) {
            if (error.response.status === 403) {
                await refreshToken();
                await handleUpdateVinyl();
            } else {
                console.log("error", error);
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

    return (
        <form className="admin_page__menu__manager" style={{width: "60%"}}>
            <h1>Chỉnh sửa thông tin sản phẩm</h1>
            <Link to="/admin/vinyl" className="button__blue__with-a">Danh sách sản phẩm</Link>
            {
                editingSuccessful &&
                <p>Thông tin sản phẩm đã được cập nhật thành công</p>
            }
            <label className="has-float-label">
                <input className="sign_up__input" name="vinylName" required type="text" value={vinyl.vinylName} onChange={handleChange}/>
                <span>Tên sản phẩm</span>
            </label>

            <label className="has-float-label">
                <select id={"artistInput"} name="artist" value={vinyl.artist.id} className="sign_up__input" onChange={handleChange}>
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
                    <span id={"file__input--thumbnail1"}>{apiUrlDefault}{vinyl.thumbnail1}</span>
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
                    <span id={"file__input--thumbnail2"}>{apiUrlDefault}{vinyl.thumbnail2}</span>
                </div>
                <label htmlFor="thumbnail2">
                    <i className="fas fa-upload"/> Choose a file...
                </label>
                <span style={{
                    transform: "translateX(10px) translateY(-24px)"
                }}>Thumbnail 2</span>
            </label>

            <label className="has-float-label">
                <input className="sign_up__input" name="quantity" step="1" min="0" required type="number" value={vinyl.quantity} onChange={handleChange}/>
                <span>Số lượng</span>
            </label>

            <label className="has-float-label">
                <input id="input_price" className="sign_up__input" name="price" step="0.01" min="0" required type="number" value={vinyl.price} onChange={handleChange}/>
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
                        vinyl.genres.map((genre, index) => {
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
                                    vinyl.genres.map(function (genre) {
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
                <select name="nation" className="sign_up__input" value={vinyl.nation.id} id={"nationInput"} onChange={handleChange}>
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
                <input id="input_discount" className="sign_up__input" name="discount" step="0.01" min="0" required type="number" value={vinyl.discount} onChange={handleChange}/>
                <span>% Giảm Giá</span>
            </label>

            <input className="button_Login_Signup" type="button" value="Cập nhật thông tin sản phẩm" onClick={handleUpdateVinyl}/>
        </form>
    );
}