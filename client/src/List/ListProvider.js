import { createContext, useMemo, useState } from "react";

export const ListDetailContext = createContext();

function ListDetailProvider({ children }) {
    const [data, setData] = useState({
        id: "tdl01",
        name: "První úkolovník",
        owner: "u1",
        memberList: ["u2", "u3"],
        itemList: [
            {
                id: "td01",
                name: "první úkol",
                resolved: false,
            },
        ],
    });

    const [showResolved, setShowResolved] = useState(false);

    const filteredData = useMemo(() => {
        const result = { ...data, itemList: [...data.itemList] };
        if (!showResolved) {
            result.itemList = result.itemList.filter((item) => !item.resolved);
        }
        return result;
    }, [data, showResolved]);

    const value = {
        data: filteredData,
        handlerMap: {
            updateName: ({ name }) => {
                setData((current) => ({
                    ...current,
                    name,
                }));
            },
            addItem: () => {
                setData((current) => ({
                    ...current,
                    itemList: [
                        ...current.itemList,
                        {
                            id: `td${Date.now()}`,
                            name: "",
                            resolved: false,
                        },
                    ],
                }));
            },
            updateItemName: ({ id, name }) => {
                setData((current) => ({
                    ...current,
                    itemList: current.itemList.map((item) =>
                        item.id === id ? { ...item, name } : item
                    ),
                }));
            },
            toggleResolveItem: ({ id }) => {
                setData((current) => ({
                    ...current,
                    itemList: current.itemList.map((item) =>
                        item.id === id ? { ...item, resolved: !item.resolved } : item
                    ),
                }));
            },
            deleteItem: ({ id }) => {
                setData((current) => ({
                    ...current,
                    itemList: current.itemList.filter((item) => item.id !== id),
                }));
            },
            addMember: ({ memberId }) => {
                setData((current) => ({
                    ...current,
                    memberList: current.memberList.includes(memberId)
                        ? current.memberList
                        : [...current.memberList, memberId],
                }));
            },
            removeMember: ({ memberId }) => {
                setData((current) => ({
                    ...current,
                    memberList: current.memberList.filter((item) => item !== memberId),
                }));
            },
        },
        showResolved,
        toggleShowResolved: () => setShowResolved((current) => !current),
    };

    return (
        <ListDetailContext.Provider value={value}>{children}</ListDetailContext.Provider>
    );
}

export default ListDetailProvider;