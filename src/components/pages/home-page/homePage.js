import React from 'react';
import './homePage.scss';
import Background from './home-bg.jpg';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <section className="home" style={{background: `url(${Background}) center center/cover no-repeat`}}>
            <div className="container">
                <div className="home__text">
                    <h1 className="header home__header">
                        Test assignment <br/>
                        for Frontend <br/>
                        Developer position
                    </h1>
                    <div className="not-mobile">
                        We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository. Please be patient, we consider and respond to every application that meets minimum requirements. We look forward to your submission. Good luck! The photo has to scale in the banner area on the different screens
                    </div>
                    <div className="mobile">
                        We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository.
                    </div>
                </div>
                <Link to="/signup"><button className="signup-btn">Sign up now</button></Link>
            </div>
        </section>
    )
};

export default HomePage;