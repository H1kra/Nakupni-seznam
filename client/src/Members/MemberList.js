import { useContext, useState } from "react";
import { ListDetailContext } from "../List/ListProvider";
import { UserContext } from "../User/UserProvider";
import AddMemberForm from "./AddMemberForm";
import Member from "./Member";

function MemberList() {
    const { data, handlerMap } = useContext(ListDetailContext);
    const { userMap, userList, loggedInUser } = useContext(UserContext);
    const [show, setShow] = useState(false);

    return (
        <div style={{ border: "1px solid grey", margin: "8px", padding: "8px" }}>
            <AddMemberForm
                show={show}
                data={data}
                userList={userList}
                handlerMap={handlerMap}
                handleClose={() => setShow(false)}
            />
            <div>
                Member List{" "}
                {data.owner === loggedInUser ? (
                    <button onClick={() => setShow(true)}>add member</button>
                ) : (
                    ""
                )}
            </div>
            <Member memberId={data.owner} data={userMap[data.owner]} isOwner={true} />
            {data.memberList.map((memberId) => (
                <Member
                    key={memberId}
                    memberId={memberId}
                    data={userMap[memberId]}
                    handlerMap={handlerMap}
                    showRemoveButton={
                        loggedInUser === data.owner || memberId === loggedInUser
                    }
                />
            ))}
        </div>
    );
}

export default MemberList;