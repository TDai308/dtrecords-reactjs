import React from "react";

export default function FooterThank() {
    const UrlDefault = process.env["REACT_APP_URL"];

    const logoImageSrc = `${UrlDefault}images/logos/coollogo_com-1546772.png`;

    return (
        <div className="footer__thanks">
            <div className="footer__logo">
                <img src={logoImageSrc} alt="DTRECORDS"/>
            </div>
            <div className="footer__thanks_and_year">
                <i className="far fa-copyright"/>2077 - bản quyền của Trần Trọng Đại - Hãng Đĩa Trọng Đại - DTRecords.<br/>
                Shout out to Merchbar.
            </div>
        </div>
    );
}