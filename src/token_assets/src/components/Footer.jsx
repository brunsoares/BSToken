import React from "react";

function Footer(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return (
        <footer className="window">
            <p>Copyright © {year} Created by <a href="https://github.com/brunsoares">@BrunSoares</a></p>
        </footer>
    )
}

export default Footer;