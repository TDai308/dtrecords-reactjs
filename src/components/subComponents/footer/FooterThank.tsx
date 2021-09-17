import React from "react";
import logoImage from "../../../static/img/logo/coollogo_com-1546772.png"

export default function FooterThank() {
    return (
        <div className="footer__thanks">
            <div className="footer__logo">
                <img src={logoImage} alt="DTRECORDS"/>
            </div>
            <div className="footer__thanks_and_year">
                <i className="far fa-copyright"/>2077 - bản quyền của Trần Trọng Đại - Hãng Đĩa Trọng Đại - DTRecords.<br/>
                Shout out to Merchbar.
            </div>
        </div>
    );
}