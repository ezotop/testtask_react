import React, { useEffect, useState } from 'react';
import Error from '../../error';
import './signUpPage.scss';
import Spinner from '../../spinner';
import Modal from '../../modal';
import { getData, postData } from '../../../services/getData';

const SignUpPage = () => {
    const [positions, setPositions] = useState([]),
          [error, setError] = useState(false),
          [loading, setLoading] = useState(false),
          [userName, setUserName] = useState(''),
          [userEmail, setUserEmail] = useState(''),
          [userPhone, setUserPhone] = useState(''),
          [userPosition, setUserPosition] = useState(''),
          [userPhotoName, setUserPhotoName] = useState(''),
          [nameDirty, setNameDirty] = useState(false),
          [emailDirty, setEmailDirty] = useState(false),
          [phoneDirty, setPhoneDirty] = useState(false),
          [invalidName, setInvalidName] = useState(false),
          [invalidEmail, setInvalidEmail] = useState(false),
          [invalidPhone, setInvalidPhone] = useState(false),
          [invalidPhoto, setInvalidPhoto] = useState(false),
          [formError, setFormError] = useState(false),
          [modalActive, setModalActive] = useState(false),
          [modalAlert, setModalAlert] = useState('');
        
    const fetchPositions = async () => {
        await getData('positions')
            .then(res => setPositions(res.data.positions))
            .catch(err => {
                setError(true);
                console.log('Error:', err.data);
            })
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        validateInputLength(userName);
        validateEmail(userEmail);
        validatePhone(userPhone);

        if (invalidName || invalidEmail || invalidPhone || !userPosition.length || !userPhotoName.length) {
            setFormError(true);
        } else {
            setLoading(true);
            const token = await getData('token')
            .then(res => {
                // console.log(res.data);
                return res.data.token
            }).catch(err => {
                setError(true);
            });

            const formData = new FormData(),
                fileField = document.querySelector('input[type="file"]');

            formData.append('position_id', userPosition);
            formData.append('name', userName);
            formData.append('email', userEmail);
            formData.append('phone', userPhone);
            formData.append('photo', fileField.files[0]);        
            
            await postData('users', token, formData)
                .then(res => {
                    setModalAlert(res.data.message);
                    setLoading(false);
                    setModalActive(true);
                }).catch(err => {
                    setLoading(false);
                    setModalAlert(err.data);
                    setModalActive(true);
                });
        } 
    };

    // Validations:
    const validateInputLength = (str, min = 1, max = 60) => {
        (str.length < min || str.length > max) ? setInvalidName(true) : setInvalidName(false);
    };
    const validateEmail = (email) => {
        const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        email.match(regEmail) ? setInvalidEmail(false) : setInvalidEmail(true);
    };
    const validatePhone = (phone) => {
        const regPhone =/^\+?380[0-9]{8}$/;
        phone.match(regPhone) ? setInvalidPhone(false) : setInvalidPhone(true);
    };

    const blurHandler = (e) => { // Если input был активным
        switch (e.target.name) {
            case 'name':
                setNameDirty(true);
                break;
            case 'email':
                setEmailDirty(true);
                break;
            case 'phone':
                setPhoneDirty(true);
                break;
            default:
                setNameDirty(false);
                setEmailDirty(false);
                setPhoneDirty(false);
                break;
        }
    };

    if (modalActive) {
        return (
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="header-second header-second_modal">Congratulations</div>
                <div className="modal__message">{modalAlert}</div>
            </Modal>
        )
    }
    if (error) {
        return <Error />
    }
    if(loading) {
        return <Spinner />
    }

    return (
        <section className="sign">
            <div className="container">
                <h1 className="header">Register to get a work</h1>
                <form className="form" onSubmit={(e) => onFormSubmit(e)} encType="multipart/form-data">
                    <div className="attention">
                        Attention! After successful registration and alert, update the list of users in the block from the top
                    </div>

                    <div className="mb20">
                        <label>Name</label>
                        <input
                            className={invalidName ? "text-input text-input_red" : "text-input"}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            onBlur={(e) => blurHandler(e)}
                            onChange={(e) => {
                                setUserName(e.target.value);
                                validateInputLength(userName);
                            }} />
                        {(nameDirty && invalidName) || (invalidName && formError) || (nameDirty && !userName) ? <div className="warn warn_red">Name must be more than 1 symbol & less than 60 symbols</div> : null}
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            className={invalidEmail ? "text-input text-input_red" : "text-input"}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            onBlur={(e) => blurHandler(e)}
                            onChange={(e) => {
                                setUserEmail(e.target.value);
                                validateEmail(userEmail);
                            }} />
                        <div className="warn warn_red">
                            {(emailDirty && invalidEmail) || (invalidEmail && formError) ? "Email must be: example@gmail.com" : (emailDirty && (userEmail.length < 2 || userEmail.length > 60) ? "Email must be more than 2 symbols & less than 60 symbols" : null)}
                        </div>
                    </div>

                    <div className="mb-20" id="phone">
                        <label>Phone number</label>
                        <input
                            className={invalidPhone ? "text-input phone text-input_red" : "text-input phone"}
                            type="phone"
                            name="phone"
                            placeholder="+380 XX XXX XX XX"
                            onBlur={(e) => blurHandler(e)}
                            onChange={(e) => {
                                setUserPhone(e.target.value);
                                validatePhone(userPhone);
                            }} />
                        {invalidPhone || (!userPhone && phoneDirty) ? <div className="warn warn_red">Enter a phone number in international format: +380 XX XXX XX XX</div> : <div className="warn">"Enter a phone number in international format"</div>}
                    </div>

                    <legend>Select your position</legend>
                    <ul className="form__radio-list">
                        {
                            positions.map(pos => {
                                const {id, name} = pos;
                                return (
                                    <li key={id}>
                                        <div className="form__radio-btn">
                                            <input
                                                type="radio"
                                                name="position"
                                                className="radio-input"
                                                id={name.toLowerCase()}
                                                value={id}
                                                onChange={(e) => setUserPosition(e.target.value)} />
                                            <label htmlFor={name.toLowerCase()}>{name}</label>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>

                    
                    <div className="field__wrapper">
                    <div>Photo</div>
                        <input
                            name="file"
                            type="file"
                            id="field__file-2"
                            className="field field__file"
                            accept=".jpg, .jpeg"
                            onChange={(e) => {
                                if(e.target.files[0].size < 5242880){
                                    console.log('good');
                                    setInvalidPhoto(false);
                                    setUserPhotoName(e.target.value);
                                 } else {
                                     setInvalidPhoto(true);
                                 }}} />
                            
                        <label className="field__file-wrapper" htmlFor="field__file-2">
                            <div className={!userPhotoName && formError ? "field__file-fake field__file-fake_red" : "field__file-fake"}>
                                {userPhotoName ? userPhotoName.replace(/^.+\\fakepath\\/gi, '') : "No file chosen"}
                            </div>
                            <div className={!userPhotoName && formError ? "field__file-button field__file-button_red" : "field__file-button"}>Browse</div>
                        </label>  
                        {invalidPhoto ? <div className="warn warn_red">Photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB</div> : null}
                    </div>
                    {formError ? <div className="wanr warn_red">All inputs are required</div> : null}
                   <button type="submit" className="signup-btn signup-btn_center">Sign up now</button>
                </form>
            </div>
        </section>
    )
};

export default SignUpPage;