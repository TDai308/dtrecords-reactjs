import React, {useEffect} from "react";

export default function HomeContent() {
    useEffect(() => {
        document.title = "DTrecords";
    }, []);

    return (
        <div className="container">
            Home Content
        </div>
    );
}