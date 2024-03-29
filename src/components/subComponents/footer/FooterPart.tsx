import React from "react";
import {Link} from "react-router-dom";
import {footerNavigationLink} from "../../MainPage/Footer";

interface FooterPartInterface {
    headingFooter: string;
    footerNavigationLink: footerNavigationLink[]
}

const FooterPart:React.FC<FooterPartInterface> = ({headingFooter, footerNavigationLink}) => {
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

export default FooterPart;