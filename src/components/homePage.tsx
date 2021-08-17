import React from "react";
import ContentBody from "./home-page/ContentBody";
import Footer from "./home-page/Footer";
import Header from "./home-page/Header";

const homePage = () => {
    return (
        <div>
            <Header/>
            <ContentBody/>
            <Footer/>
        </div>
    );
}

export default homePage;