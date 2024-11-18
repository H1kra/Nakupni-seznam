import { useContext } from "react";
import { useParams } from 'react-router-dom';
import { ListDetailContext } from "../List/ListProvider";
import { UserContext } from "../User/UserProvider";

import Member from "./Member";

function MemberList() {
    const { data, handlerMap } = useContext(ListDetailContext);
    const { userMap, loggedInUser } = useContext(UserContext);
    const { id } = useParams();
    const list = data.find((list) => list.id === id);
    console.log(list);
    if (!list) {
        return <p>List not found!</p>;
    }


    return (
        <div style={{ border: "1px solid grey", margin: "8px", padding: "8px", width: "200px "}}>
            <div>
                <h2>Member List{" "}</h2>
            </div>
            <Member memberId={list.owner} data={userMap[list.owner]} isOwner={true} />
            {list.memberList.map((memberId) => (
                <Member
                    key={memberId}
                    memberId={memberId}
                    data={userMap[memberId]}
                    handlerMap={handlerMap}
                    listId={list.id}
                    showRemoveButton={loggedInUser === list.owner || memberId === loggedInUser}
                />
            ))}
        </div>
    );
}

export default MemberList;