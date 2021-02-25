import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserItem from '../user-item';
import Spinner from '../spinner';
import Error from '../error';
import { getData } from '../../services/getData';

const UserList = ({history}) => {
    const [users, setUsers] = useState([]),
          [currentPage, setCurrentPage] = useState(1),
          [totalPages, setTotalPages] = useState(0),
          [error, setError] = useState(false),
          [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        await getData(`users?page=${currentPage}&count=6`)
            .then(res => {
                setLoading(false);
                setUsers([...users, ...res.data.users]);
                setCurrentPage(prev => prev + 1);
                setTotalPages(res.data.total_pages);
            })
            .catch((err) => {
                console.log('err');
                setLoading(false);
                setError(true);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    function byRegDate(field) { // Sorting by reg date, But API has the same timestamp on some users!
        return (a, b) => a[field] > b[field] ? -1 : 1;
    } // arr.sort(byRegDate('registration_timestamp'))

    // In case API doesn`t contain users:
    const content = users.length ? users.sort(byRegDate('registration_timestamp')).map(user => {
        return <UserItem
                    key={user.id}
                    user={user}
                    onUserSelected={(id) => {
                        history.push(`/users/${id}`) // Добавим в адресную строку
                    }} />
    }) : <div className="no-users">There is no users, yet. Do you want to be first?</div>;

    const showMoreBtn = () => {
        if (!loading && users.length > 0) { // Если загрузки нет и юзеры есть, то покажем контент
            return (
                <button
                    className={currentPage > totalPages ? "hide" : "signup-btn signup-btn_center"}
                    onClick={fetchUsers}>Show more</button> // Если к-во страниц закончилось, то кнопка изчезает
            )
        } else if (!loading && users.length <= 0) { // А если юзеров нету, то покажем кнопку "sign up"
            return (
                <Link to="/signup" className="btn-link">
                    <button className="signup-btn signup-btn_center">Sign up now</button>
                </Link>
            )
        } else {
            return null
        }
    };

    if (error) {
        return <Error/>
    }

    return (
        <section className="users">
            <div className="container">
                <h1 className="header">Our cheerful users</h1>
                <div className="attention">Attention! Sorting users by registration date</div>
                <ul className="users__wrapper">
                    {
                        loading ? <Spinner /> : content
                    }
                </ul>
                {showMoreBtn()}
            </div>
        </section>
    )
};

export default withRouter(UserList);

// currentPage >= totalPages
// users.length >= totalUsers 