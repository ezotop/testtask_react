import React, { useState } from 'react';
import './userItem.scss';

const UserItem = ({user, onUserSelected}) => {
    const [tipClass, setTipClass] = useState('hide');

    const {id, photo, name, position, email, phone} = user;

    return (
        <li className="user" onClick={() => onUserSelected(id)} style={{cursor: 'pointer'}}>
                <div className="user__avatar">
                    <img src={photo} alt="avatar"></img>
                </div>
                <div className="user__name header-second">{name}</div>
                <div className="user__position">
                    {position}
                    <div className={tipClass}>{email}</div>
                </div>
                <div className="user__email"
                    onMouseEnter={(e) => {
                        setTipClass('tooltip');

                    }}
                    onMouseOut={() => setTipClass('hide')}>
                    {email}
                </div>
                <div className="user__phone">{phone}</div>
        </li>
    )
};

export default UserItem;