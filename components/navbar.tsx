'use client'
import "../app/index.css";
import React, { useState } from 'react';

export default function Navbar() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const showSidebar = () => {
        console.log("showSidebar function called");
        setSidebarVisible(true);
    };

    const hideSidebar = () => {
        console.log("hideSidebar function called");
        setSidebarVisible(false);
    };

    return (
        <nav>
            <ul className={`sidebar ${isSidebarVisible ? 'show' : 'hide'}`}>
                <li onClick={hideSidebar}>
                    <a>
                        <i className="material-icons">close</i>
                    </a>
                </li>
                <li id="judul">
                    <a href="index.html">SendTheMeme</a>
                </li>
                <li>
                    <a href="/submit">Submit</a>
                </li>
                <li>
                    <a href="#">Browser</a>
                </li>
                <li>
                    <a href="#">Support</a>
                </li>
            </ul>
            <ul>
                <li id="judul">
                    <a href="index.html">SendTheMeme</a>
                </li>
                <li className="hideOnMobile">
                    <a href="/submit">Submit</a>
                </li>
                <li className="hideOnMobile">
                    <a href="/browse">Browser</a>
                </li>
                <li className="hideOnMobile">
                    <a href="#">Support</a>
                </li>
                <li onClick={showSidebar}>
                    <a>
                        <i className="material-icons">menu</i>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
