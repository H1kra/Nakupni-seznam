import React, { useState, useContext } from 'react';
import { ListDetailContext } from "../List/ListProvider";
import { UserContext } from "../User/UserProvider";

function CustomModal() {
    const { data, handlerMap } = useContext(ListDetailContext);
    const { loggedInUser } = useContext(UserContext);
    const isUserMember = data?.memberList?.includes(loggedInUser) || data.owner === loggedInUser;
    const [isHovered, setIsHovered] = useState(false);
    const cardStyle = {
        width: "200px",
        height: "300px",
        backgroundColor: isHovered ? "grey":"lightgray",
        cursor: "pointer",
        margin: "20px",
        borderRadius: "10px",
        overflow: "hidden",
        border: isHovered ? "1px solid black" : "",
        transition: "border 0.3s ease"
    };
    console.log(data?.memberList?.includes(loggedInUser))



    return (
        <div>
            {isUserMember && (
                <div
                    style={cardStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <h3 style={{textAlign: "center"}}>{data.name || "Unnamed List"}</h3>
                    {data.itemList.map((item) => (
                        <p key={item.id} style={{marginLeft: "5px"}}>
                            • {item.name || "Unnamed Item"}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomModal;