import React, {useEffect} from "react";

export default function ErrorPage() {
    useEffect(() => {
        const alertLogin = () => {
            setTimeout(() => {
                if (window.confirm("Hãy đăng nhập với tư cách là admin!!!")) {
                    window.location.href = "/login";
                } else {
                    window.location.href = "/";
                }
            },500);
        };
        alertLogin();
    },[])

    return (
        <div className="background-error-404">

        </div>
    );
}