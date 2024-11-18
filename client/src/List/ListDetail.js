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
                <h1>{list.name}</h1>{" "}
                {loggedInUser === list.owner ? (
                    <button onClick={() => setShow(true)}>update name</button>
                ) : (
                    ""
                )}
                <h2>Tasks:</h2>
                <ul>
                    {list.itemList.map((item) => (
                        <li key={item.id}>
                            <Item data={item} handlerMap={handlerMap} listId={list.id} />
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