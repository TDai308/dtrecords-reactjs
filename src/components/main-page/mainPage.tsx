import React from "react";
import ContentBody from "./ContentBody";
import Footer from "./Footer";
import Header from "./Header";

export default function mainPage() {
    return (
        <div>
            <Header/>
            <ContentBody/>
            <Footer/>
        </div>
    );
}