import React from "react";
import ContentBody from "./ContentBody";
import Footer from "./Footer";
import Header from "./Header";

export default function homePage() {
    return (
        <div>
            <Header/>
            <ContentBody/>
            <Footer/>
        </div>
    );
}