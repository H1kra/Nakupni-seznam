import React, { useState, useContext  } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../images/LOGO.png';

import { UserContext } from "../User/UserProvider"

import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

function NavBar() {
    const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const handleIconClick = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%",border: "solid 1px" }}>
            <img src={logo} alt={"logo"} style={{ marginLeft: "50px", width: "100px" }} onClick={() => navigate(`/`)}></img>
            <div style={{ width: "50%", display: "flex", justifyContent: "flex-end", marginRight: "50px" }}>
                <Icon path={mdiAccount} size={1} onClick={handleIconClick} />
            </div>
            {isModalVisible && (
                <Modal onClose={closeModal}>
                    {userList.map((user) => (
                        <button key={user.id} onClick={() => setLoggedInUser(user.id)}>
                            {user.name} {user.id === loggedInUser ? <strong>(logged in)</strong> : ""}
                        </button>
                    ))}
                </Modal>
            )}
        </div>
    );
}

function Modal({ children, onClose }) {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        }}
             onClick={onClose}>
            <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                maxWidth: "400px",
                width: "90%",
                textAlign: "center",
            }}
                 onClick={(e) => e.stopPropagation()}>
                {children}
                <button onClick={onClose} style={{ marginTop: "10px" }}>Close</button>
            </div>
        </div>
    );
}

export default NavBar;