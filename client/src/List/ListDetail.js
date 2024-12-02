import { useParams } from 'react-router-dom';
import { useContext, useState } from "react";
import {ListDetailContext} from "./ListProvider";
import MemberList from "../Members/MemberList";
import Item from "./Item";
import { UserContext } from "../User/UserProvider";
import UpdateNameForm from "./UpdateNameForm";

function ListDetail() {
    const { id } = useParams();
    const { data, handlerMap } = useContext(ListDetailContext);
    const { loggedInUser } = useContext(UserContext);
    const list = data.find((list) => list.id === id);
    const [show, setShow] = useState(false);
    if (!list) {
        return <p>List not found!</p>; // Handle invalid IDs
    }

    const detailStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",

};
    return (
        <div style={detailStyle}>
            <div>
                <UpdateNameForm
                    show={show}
                    handleClose={() => setShow(false)}
                    data={list}
                    handlerMap={handlerMap}
                />
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <h1>{list.name}</h1>
                    {loggedInUser === list.owner && (
                        <button onClick={() => setShow(true)}>Update Name</button>
                    )}
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <h2>Item List:</h2>
                    <button onClick={() => handlerMap.addItem({listId: list.id, name: "New Item"})}>Add item</button>
                </div>
                <ul>
                    {list.itemList.map((item) => (
                        <li key={item.id}>
                            <Item data={item} handlerMap={handlerMap} listId={list.id}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <MemberList/>
            </div>
        </div>
    )

}

export default ListDetail;