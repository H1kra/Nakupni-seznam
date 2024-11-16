import React, { useState, useContext } from 'react';
import { ListDetailContext } from "../List/ListProvider";
import { UserContext } from "../User/UserProvider";

function CustomModal() {
    const { data, handlerMap } = useContext(ListDetailContext);
    const { loggedInUser } = useContext(UserContext);
    const isUserMember = data?.some(list => list.memberList?.includes(loggedInUser) || list.owner === loggedInUser);
    const [hoveredItemId, setHoveredItemId] = useState(null);
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
    console.log(data)


    return (
        isUserMember && ( // Check if the user is a member before rendering the content
            <div style={containerStyle}>
                {data.map((list) => (
                    <div
                        key={list.id} // Ensure each child in a list has a unique key
                        style={cardStyle(hoveredItemId === list.id)} // Change style based on hover
                        onMouseEnter={() => setHoveredItemId(list.id)} // Set the hovered card id
                        onMouseLeave={() => setHoveredItemId(null)} // Reset on mouse leave
                    >
                        <h3 style={{ textAlign: "center" }}>{list.name || "Unnamed List"}</h3>
                        {list.itemList.map((item) => (
                            <p key={item.id} style={{ marginLeft: "5px" }}>
                                • {item.name || "Unnamed Item"}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        )
    );
}

export default CustomModal;