import { useParams } from 'react-router-dom';
import {useContext} from "react";
import {ListDetailContext} from "./ListProvider";

function ListDetail() {
    const { id } = useParams();
    const { data } = useContext(ListDetailContext);
    const list = data.find((list) => list.id === id);

    if (!list) {
        return <p>List not found!</p>; // Handle invalid IDs
    }
    return (
        <div>
            <div>
                <h1>{list.name}</h1>
                <h2>Tasks:</h2>
                <ul>
                    {list.itemList.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default ListDetail;