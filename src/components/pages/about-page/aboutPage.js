import React from 'react';
import { Link } from 'react-router-dom';
import './abotPage.scss';

const AboutPage = () => {
    return (
        <section className="about">
            <div className="container">
                <h1 className="header">Let's get acquainted</h1>
                <div className="about__wrapper">
                    <div className="about__image">
                        <img src={process.env.PUBLIC_URL + 'img/man-laptop-v1-min.svg'} alt="man-laptop" />
                    </div>
                    <div className="about__text">
                        <h2 className="header-second">I am cool frontend developer</h2>
                        <div>We will evaluate how clean your approach to writing CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restriction.<br/>
                        <br/>
                        If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page P​SD mockup​ into HTML5/CSS3.</div>
                        <Link to="/signup" className="sign-link">Sign up now</Link>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AboutPage;