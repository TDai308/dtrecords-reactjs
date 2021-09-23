import React from "react";
import {Link} from "react-router-dom";

export default function Category() {
    const  categoryList = [
        {
            headingCategory: "Quốc Gia",
            linkCategory: [
                {
                    title: "Việt Nam",
                    url: ""
                },
                {
                    title: "Mỹ",
                    url: ""
                },
                {
                    title: "Hàn Quốc",
                    url: ""
                }
            ]
        },
        {
            headingCategory: "Thể Loại",
            linkCategory: [
                {
                    title: "Pop",
                    url: ""
                },
                {
                    title: "Rock",
                    url: ""
                },
                {
                    title: "R&B",
                    url: ""
                },
                {
                    title: "HipHop",
                    url: ""
                },
                {
                    title: "Country",
                    url: ""
                },
                {
                    title: "EDM",
                    url: ""
                },
                {
                    title: "Indie",
                    url: ""
                },
                {
                    title: "Jazz",
                    url: ""
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