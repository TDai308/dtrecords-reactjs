import React from "react";
import ContentBody from "./main-page/ContentBody";
import Footer from "./main-page/Footer";
import Header from "./main-page/Header";

export default function mainPage() {
    return (
        <div>
            <Header/>
            <ContentBody/>
            <Footer/>
        </div>
    );
}