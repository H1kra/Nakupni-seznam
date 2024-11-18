import React, { useState, useContext } from "react";
import { ListDetailContext } from "../List/ListProvider";
import { UserContext } from "../User/UserProvider";
import { useNavigate } from "react-router-dom";

function CustomModal() {
    const { data, handlerMap } = useContext(ListDetailContext);
    const { loggedInUser } = useContext(UserContext);
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newListName, setNewListName] = useState("");
    const navigate = useNavigate();

    const cardStyle = (isHovered) => ({
        width: "200px",
        height: "300px",
        backgroundColor: isHovered ? "grey" : "lightgray",
        cursor: "pointer",
        margin: "20px",
        borderRadius: "10px",
        overflow: "hidden",
        border: isHovered ? "1px solid black" : "",
        transition: "border 0.3s ease",
    });

    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px",
    };


    const userLists = data.filter(
        (list) => list.owner === loggedInUser || list.memberList.includes(loggedInUser)
    );

    const handleCreateList = () => {
        const newListId = `tdl${Date.now()}`;
        const newList = {
            id: newListId,
            name: newListName || "Untitled List",
            owner: loggedInUser,
            memberList: [],
            itemList: [],
        };
        handlerMap.createList(newList);
        setIsModalOpen(false);
        setNewListName("");
        navigate(`/ListDetail/${newListId}`);
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 5%" }}>
                <button onClick={() => console.log("Archive clicked")}>Archive</button>
                <button onClick={() => setIsModalOpen(true)}>Create list</button>
            </div>

            {userLists.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                    No lists to display
                </p>
            ) : (
                <div style={containerStyle}>
                    {userLists.map((list) => (
                        <div
                            key={list.id}
                            style={cardStyle(hoveredItemId === list.id)}
                            onMouseEnter={() => setHoveredItemId(list.id)}
                            onMouseLeave={() => setHoveredItemId(null)}
                            onClick={() => navigate(`/ListDetail/${list.id}`)}
                        >
                            <h3
                                style={{
                                    textAlign: "center",
                                    borderBottom: "1px solid black",
                                }}
                            >
                                {list.name}
                            </h3>
                            {list.itemList.map((item) => (
                                <p key={item.id} style={{ marginLeft: "5px" }}>
                                    • {item.name}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                        zIndex: 1000,
                    }}
                >
                    <h3>Create New List</h3>
                    <input
                        type="text"
                        placeholder="Enter list name"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            style={{
                                padding: "8px 16px",
                                border: "none",
                                backgroundColor: "lightgray",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreateList}
                            style={{
                                padding: "8px 16px",
                                border: "none",
                                backgroundColor: "blue",
                                color: "white",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Create
                        </button>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 999,
                    }}
                    onClick={() => setIsModalOpen(false)}
                ></div>
            )}
        </div>
    );
}

export default CustomModal;