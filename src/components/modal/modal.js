import React from 'react';
import './modal.scss';

const Modal = ({active, setActive, children}) => {
    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={() => setActive(false)}>
            <div
                className={active ? "modal__content active" : "modal__content"}
                onClick={(e) => e.stopPropagation()}>
                    <div className="modal__close" onClick={() => setActive(false)}>&times;</div>
                {children}
                <button className="signup-btn signup-btn_modal" onClick={() => setActive(false)}>Great</button>
            </div>
        </div>
    )
};

export default Modal;