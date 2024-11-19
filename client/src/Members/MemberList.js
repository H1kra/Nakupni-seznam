import { useContext, useState } from "react";
import { useParams } from 'react-router-dom';
import { ListDetailContext } from "../List/ListProvider";
import { UserContext } from "../User/UserProvider";

import AddMemberForm from "./AddMemberForm";
import Member from "./Member";

function MemberList() {
    const { data, handlerMap } = useContext(ListDetailContext);
    const { userMap, userList, loggedInUser } = useContext(UserContext);
    const { id } = useParams();
    const list = data.find((list) => list.id === id);
    const [show, setShow] = useState(false);
    if (!list) {
        return <p>List not found!</p>;
    }


    return (
        <div style={{ border: "1px solid grey", margin: "8px", padding: "8px", width: "250px "}}>
            <AddMemberForm
                show={show}
                data={data}
                userList={userList}
                handlerMap={handlerMap}
                handleClose={() => setShow(false)}
                listId={list.id}
            />
            <div>
                <h2>Member List{" "}</h2>
                {list.owner === loggedInUser && (
                    <button onClick={() => setShow(true)}>add member</button>
                )}
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