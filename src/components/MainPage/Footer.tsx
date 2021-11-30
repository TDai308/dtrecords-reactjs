import React from "react";
import FooterPart from "../subComponents/footer/FooterPart";
import FooterThank from "../subComponents/footer/FooterThank";

export type footerNavigationLink = {
    url: string,
    title: string,
    icon?: JSX.Element
}

type footerColumnType = {
    headingFooter: string,
    footerNavigationLink: footerNavigationLink[]
};

const Footer = () => {

    const footerColumn : footerColumnType[] = [
        {
            headingFooter: "Tài khoản",
            footerNavigationLink: [
                {
                    url: "",
                    title: "Quản lý tài khoản"
                },
                {
                    url: "",
                    title: "Lịch sử mua hàng"
                },
                {
                    url: "",
                    title: "Những sản phẩm yêu thích"
                }
            ]
        },
        {
            headingFooter: "Hỗ trợ",
            footerNavigationLink: [
                {
                    url: "",
                    title: "Giải đáp thắc mắc"
                }
            ]
        },
        {
            headingFooter: "DTRecords",
            footerNavigationLink: [
                {
                    url: "",
                    title: "Giới thiệu"
                },
                {
                    url: "",
                    title: "Người sáng lập"
                },
                {
                    url: "",
                    title: "Đội ngũ phục vụ"
                }
            ]
        },
        {
            headingFooter: "Liên hệ",
            footerNavigationLink: [
                {
                    url: "",
                    title: "Facebook",
                    icon: <i className="fab fa-facebook-f"/>
                },
                {
                    url: "",
                    title: "Instagram",
                    icon: <i className="fab fa-instagram"/>
                }
            ]
        }
    ];

    return(
        <div className="footer">
            <div className="grid wide">
                <div className="row sm-gutter app-content">
                    {
                        footerColumn.map((column,index) => {
                            return (
                                <div key={index} className="col l-3 m-6 c-12">
                                    <FooterPart headingFooter={column.headingFooter} footerNavigationLink={column.footerNavigationLink}/>
                                </div>
                            );
                        })
                    }
                </div>
                <FooterThank/>
            </div>
        </div>
    );
}

export default Footer;