import React from "react";
import {Link} from "react-router-dom";

export default function Category() {
    const  categoryList = [
        {
            headingCategory: "Quốc Gia",
            linkCategory: [
                {
                    title: "Việt Nam",
                    url: "/products/VietnamVinyls"
                },
                {
                    title: "Mỹ",
                    url: "/products/UsUkVinyls"
                },
                {
                    title: "Hàn Quốc",
                    url: "/products/KoreanVinyls"
                }
            ]
        },
        {
            headingCategory: "Thể Loại",
            linkCategory: [
                {
                    title: "Pop",
                    url: "/products/PopVinyl"
                },
                {
                    title: "Rock",
                    url: "/products/RockVinyl"
                },
                {
                    title: "R&B",
                    url: "/products/R&BVinyl"
                },
                {
                    title: "HipHop",
                    url: "/products/HipHopVinyl"
                },
                {
                    title: "Country",
                    url: "/products/CountryVinyl"
                },
                {
                    title: "EDM",
                    url: "/products/EDMVinyl"
                },
                {
                    title: "Indie",
                    url: "/products/IndieVinyl"
                },
                {
                    title: "Jazz",
                    url: "/products/JazzVinyl"
                }
            ]
        }
    ];

    const renderCategoryList = (): JSX.Element[] => {
        return categoryList.map((categoryItem,index) => {
            return (
                <li key={index}>
                    <h3>{categoryItem.headingCategory}</h3>
                    <ul className="category__item">
                        {
                            categoryItem.linkCategory.map((Category,index) => {
                                return (
                                    <li key={index}><Link className="category__item__link" to={Category.url}>{Category.title}</Link></li>
                                );
                            })
                        }
                    </ul>
                </li>
            );
        });
    }

    return (
        <nav className="category">
            <h2 className="category--title">Tìm Theo</h2>
            <ul className="category__list">
                {
                    renderCategoryList()
                }
            </ul>
        </nav>
    );
}