import React from 'react';
import AppFooter from '../app-footer';
import AppHeader from '../app-header';

const MainContainer = ({children}) => {
    return (
        <>
            <AppHeader />
            <main>
                {children}
            </main>
            <AppFooter />
        </> 
    )
};

export default MainContainer;