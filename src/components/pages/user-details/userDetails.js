import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../../services/getData';
import Error from '../../error';
import Spinner from '../../spinner';

const UserDetails = ({userId}) => {
    const [user, setUser] = useState({}),
          [error, setError] = useState(false),
          [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchUser();
    }, []);
        
    async function fetchUser() {
        setLoading(true);
        await getData(`users/${userId}`)
            .then(res => {
                if (!res.data.success) {
                    console.log(res.request.status);
                    setLoading(false);
                    setError(true);
                } else {
                    console.log(res.request.status);
                    setLoading(false);
                    setUser(res.data.user);
                }     
            })
            .catch((err) => {
                console.log('error:', err);
                setLoading(false);
                setError(true);
            });
    }

    if (error) {
        return <Error />
    }
    if(loading) {
        return <Spinner />
    }

    const {photo, name, position, email, phone} = user;

    return (
        <section className="user-details">
            <div className="container">
                <h1 className="header">Information about user</h1>
                <div className="user-details__wrapper user">
                    <div className="user-details__avatar user__avatar">
                        <img src={photo} alt="avatar"></img>
                    </div>
                    <div className="user-details__name user__name header-second">{name}</div>
                    <div className="user-details__position user__position">{position}</div>
                    <div className="user-details__mail user__email">{email}</div>
                    <div className="user-details__phone">{phone}</div>
                    <Link to="/users"><button className="signup-btn ">Back</button></Link>
                </div>
                
            </div>
        </section>
    )
};

export default UserDetails;

        