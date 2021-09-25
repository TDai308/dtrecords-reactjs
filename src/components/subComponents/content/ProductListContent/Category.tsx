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
                    url: "/products/popVinyl"
                },
                {
                    title: "Rock",
                    url: "/products/rockVinyl"
                },
                {
                    title: "R&B",
                    url: "/products/r&bVinyl"
                },
                {
                    title: "HipHop",
                    url: "/products/hiphopVinyl"
                },
                {
                    title: "Country",
                    url: "/products/countryVinyl"
                },
                {
                    title: "EDM",
                    url: "/products/edmVinyl"
                },
                {
                    title: "Indie",
                    url: "/products/indieVinyl"
                },
                {
                    title: "Jazz",
                    url: "/products/jazzVinyl"
                }
            ]
        }
    ]

    return (
        <nav className="category">
            <h2 className="category--title">Tìm Theo</h2>
            <ul className="category__list">
                {
                    categoryList.map((categoryItem,index) => {
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
                    })
                }
            </ul>
        </nav>
    );
}