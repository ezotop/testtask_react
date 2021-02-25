import React from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../main-container/main-container';

const Error = () => {
    return (
        <MainContainer>
            <div className="error">
                404 Page not found <br/>
                Error has been occured, sorry</div>
            <Link to="/"><button>&larr; Main page</button></Link>
        </MainContainer>
    )
}

export default Error;