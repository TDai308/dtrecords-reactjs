import React from "react";
import {Link} from "react-router-dom";
import {footerNavigationLink} from "../../HomePage/Footer";

export default function FooterPart(headingFooter:string, footerNavigationLink: footerNavigationLink[]) {
    return (
        <div className="footer__part">
            <h2>{headingFooter}</h2>
            <ul>
                {
                    footerNavigationLink.map((link,index) => {
                        return (
                            <li key={index}><Link className="footer_link" to={link.url}>{link.title} {link.icon}</Link></li>
                        );
                    })
                }
            </ul>
        </div>
    );
}