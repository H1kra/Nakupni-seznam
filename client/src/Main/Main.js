import React, { useState, useContext } from 'react';
import MemberList from "../Members/MemberList";
import ItemList from "../List/ItemList";
import UpdateNameForm from "../List/UpdateNameForm";
import { ListDetailContext } from "../List/ListProvider";
import { UserContext } from "../User/UserProvider";

function CustomModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSecondaryModalVisible, setIsSecondaryModalVisible] = useState(false);
    const [showUpdateNameForm, setShowUpdateNameForm] = useState(false);
    const { data, handlerMap } = useContext(ListDetailContext);
    const { loggedInUser } = useContext(UserContext);
    const isUserMember = data.memberList.includes(loggedInUser) || data.owner === loggedInUser;

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);
    const openSecondaryModal = () => setIsSecondaryModalVisible(true);
    const closeSecondaryModal = () => setIsSecondaryModalVisible(false);

    return (
        <div>
            {isUserMember && (
                <div
                    style={{
                        width: "200px",
                        height: "300px",
                        backgroundColor: "lightgray",
                        cursor: "pointer",
                        margin: "20px",
                        borderRadius: "10px"
                    }}
                    onClick={openModal}
                >
                    <h3 style={{ textAlign: "center" }}>{data?.name}</h3>
                    {data?.itemList.map((item) => (
                        <p key={item.id} style={{ marginLeft: "5px" }}>• {item.name}</p>
                    ))}
                </div>
            )}

            {isModalVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                    onClick={closeModal}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            maxWidth: "400px",
                            width: "90%",
                            textAlign: "center",
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
                    >
                        <div>
                            <h2>{data?.name}</h2>
                            <UpdateNameForm
                                show={showUpdateNameForm}
                                handleClose={() => setShowUpdateNameForm(false)}
                                data={data}
                                handlerMap={handlerMap}
                            />
                            {" "}
                            {loggedInUser === data?.owner ? (
                                <button onClick={() => setShowUpdateNameForm(true)}>Update Name</button>
                            ) : (
                                ""
                            )}
                        </div>
                        <ItemList/>
                        <button onClick={openSecondaryModal} style={{ marginTop: "10px" }}>
                            Members
                        </button>
                        <button onClick={closeModal} style={{ marginTop: "10px" }}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {isSecondaryModalVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1100,
                    }}
                    onClick={closeSecondaryModal}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            maxWidth: "300px",
                            width: "80%",
                            textAlign: "center",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Member List</h3>
                        <MemberList />
                        <button onClick={closeSecondaryModal} style={{ marginTop: "10px" }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomModal;