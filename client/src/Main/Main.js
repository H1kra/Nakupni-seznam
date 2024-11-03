import React, { useState } from 'react';
import MemberList from "../Members/MemberList";
import ItemList from "../List/ItemList";

function CustomModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    return (
        <div>
            <div
                style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "skyblue",
                    cursor: "pointer",
                    margin: "20px",
                }}
                onClick={openModal}
            />

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
                        <h2>Modal Content</h2>
                        <MemberList />
                        <ItemList />
                        <button onClick={closeModal} style={{ marginTop: "10px" }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomModal;