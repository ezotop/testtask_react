import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './app-header.scss';

const AppHeader = () => {
    const [burger, setBurger] = useState(false);

    if (burger) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'visible';
    }

    const changeColor = (e) => {
        document.querySelectorAll('.navbar__link-item').forEach(item => {
            item.style.color = '';
        });
        if (e.target && e.target.classList.contains("navbar__link-item")) {
            e.target.style.color = "#007bff";
        }
    };

    return (
        <header>   
            <nav className={burger ? "navbar navbar_active" : "navbar"}>
                <div className="navbar__menu" onClick={(e) => {
                        changeColor(e);
                        if (burger && (e.target.nodeName === 'A' || e.target.nodeName === 'IMG')) { // Close mob menu after clicking
                            setBurger(false);
                        }
                    }}>
                    <Link to="/" className="navbar__logo"><img src={process.env.PUBLIC_URL + "img/logo-min.svg"} alt="logo"></img></Link>
                    <div className="navbar__link">
                        <Link to="/about" className="navbar__link-item">About me</Link>
                        <Link to="/relationships" className="navbar__link-item">Relationships</Link>
                        <Link to="/requirements" className="navbar__link-item">Requirements</Link>
                        <Link to="/users" className="navbar__link-item">Users</Link>
                        <Link to="/signup" className="navbar__link-item">Sign Up</Link>
                    </div>
                    <div className={burger ? "navbar__link" : "hide"}>
                        <Link to="/about" className="navbar__link-item">How it works</Link>
                        <Link to="/about" className="navbar__link-item">Partneship</Link>
                        <Link to="/about" className="navbar__link-item">Help</Link>
                        <Link to="/about" className="navbar__link-item">Leave testimonials</Link>
                        <Link to="/about" className="navbar__link-item">Contact us</Link>
                    </div>
                    <div className={burger ? "navbar__link" : "hide"}>
                        <Link to="/about" className="navbar__link-item">Articles</Link>
                        <Link to="/about" className="navbar__link-item">Our news</Link>
                        <Link to="/about" className="navbar__link-item">Testimonials</Link>
                        <Link to="/about" className="navbar__link-item">Licenses</Link>
                        <Link to="/about" className="navbar__link-item">Privacy policy</Link>
                    </div>
                    <div className={burger ? "burger burger_active" : "burger"} onClick={() => setBurger(!burger)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={burger ? "overlay" : "hide"} onClick={() => setBurger(!burger)}></div>
                </div>
            </nav>  
        </header>
    )
};

export default AppHeader;