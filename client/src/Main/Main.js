import React, { useState, useContext } from 'react';
import { ListDetailContext } from "../List/ListProvider";
import { UserContext } from "../User/UserProvider";
import { useNavigate } from "react-router-dom";

function CustomModal() {
    const { data } = useContext(ListDetailContext);
    const { loggedInUser } = useContext(UserContext);
    const [hoveredItemId, setHoveredItemId] = useState(null);
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
        transition: "border 0.3s ease"
    });
    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px",
    };

    return (
        <div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <button style={{marginRight: "5%"}}>Archive</button>
                <button style={{marginRight: "5%"}}>Create list</button>
            </div>
                <div style={containerStyle}>
                    {data.map((list) => {
                        const isUserMember =
                            list.owner === loggedInUser || list.memberList.includes(loggedInUser);
                        return(
                            isUserMember && (
                                <div
                                    key={list.id}
                                    style={cardStyle(hoveredItemId === list.id)}
                                    onMouseEnter={() => setHoveredItemId(list.id)}
                                    onMouseLeave={() => setHoveredItemId(null)}
                                    onClick={() => navigate(`/ListDetail/${list.id}`)}
                                >
                                    <h3 style={{ textAlign: "center", borderBottom: "1px solid black" }}>{list.name}</h3>
                                    {list.itemList.map((item) => (
                                        <p key={item.id} style={{ marginLeft: "5px" }}>
                                            • {item.name}
                                        </p>
                                    ))}
                                </div>
                            )
                        );
                    })}
                </div>
        </div>
    );
}

export default CustomModal;