import React from "react";
import {Link} from "react-router-dom";

const BlogMenu = () => {
    const BlogMenuList = [
        {
            url: "/",
            title: "News!"
        },
        {
            url: "/",
            title: "Top100!"
        }
    ];

    const renderBlogNewList = (): JSX.Element[] => {
        return BlogMenuList.map((BlogItem, index) => {
            return(
                <li className="product_menu__selector" key={index}>
                    <h2 className="blogs__selector__header">
                        <Link to={BlogItem.url} className="product__selector__header">{BlogItem.title}</Link>
                    </h2>
                </li>
            );
        })
    }

    return(
        <div className="product_menu">
            <ul className="product_menu__selectors">
                {
                    renderBlogNewList()
                }
            </ul>
        </div>
    );
};

export default BlogMenu;