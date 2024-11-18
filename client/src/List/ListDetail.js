import { useParams } from 'react-router-dom';
import { useContext} from "react";
import {ListDetailContext} from "./ListProvider";
import MemberList from "../Members/MemberList";
import Item from "./Item";

function ListDetail() {
    const { id } = useParams();
    const { data, handlerMap } = useContext(ListDetailContext);
    const list = data.find((list) => list.id === id);
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
                <h1>{list.name}</h1>
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