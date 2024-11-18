import { createContext, useMemo, useState } from "react";

export const ListDetailContext = createContext();

function ListDetailProvider({ children }) {
    const [data, setData] = useState(
        [
                    {
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
                        archived: "true"

                    },
                    {
                        id: "tdl02",
                        name: "Druhý úkolovník",
                        owner: "u2",
                        memberList: [],
                        itemList: [
                            {
                                id: "td01",
                                name: "první úkol",
                                resolved: false,
                            },
                        ],

                    },
                    {
                        id: "tdl03",
                        name: "Třetí úkolovník",
                        owner: "u3",
                        memberList: [],
                        itemList: [
                            {
                                id: "td01",
                                name: "první úkol",
                                resolved: false,
                            },
                        ],
                    }
                ]
    );

    const [showResolved, setShowResolved] = useState(false);

    const filteredData = useMemo(() => {
        return data.map((list) => ({
            ...list,
            itemList: showResolved
                ? list.itemList
                : list.itemList.filter((item) => !item.resolved),
        }));
    }, [data, showResolved]);

    const updateList = (id, callback) => {
        setData((current) =>
            current.map((list) => (list.id === id ? callback(list) : list))
        );
    };

    const handlerMap = {
        updateName: ({ id, name }) => {
            updateList(id, (list) => ({ ...list, name }));
        },
        createList: ({ name, owner }) => {
            setData((current) => [
                ...current,
                {
                    id: `tdl${Date.now()}`,
                    name,
                    owner,
                    memberList: [],
                    itemList: [],
                    archived: false,
                },
            ]);
        },
        addItem: ({ listId, name }) => {
            updateList(listId, (list) => ({
                ...list,
                itemList: [
                    ...list.itemList,
                    { id: `td${Date.now()}`, name, resolved: false },
                ],
            }));
        },
        updateItemName: ({ listId, itemId, name }) => {
            updateList(listId, (list) => ({
                ...list,
                itemList: list.itemList.map((item) =>
                    item.id === itemId ? { ...item, name } : item
                ),
            }));
        },
        toggleResolveItem: ({ listId, itemId }) => {
            updateList(listId, (list) => ({
                ...list,
                itemList: list.itemList.map((item) =>
                    item.id === itemId ? { ...item, resolved: !item.resolved } : item
                ),
            }));
        },
        deleteItem: ({ listId, itemId }) => {
            updateList(listId, (list) => ({
                ...list,
                itemList: list.itemList.filter((item) => item.id !== itemId),
            }));
        },
        addMember: ({ listId, memberId }) => {
            updateList(listId, (list) => ({
                ...list,
                memberList: list.memberList.includes(memberId)
                    ? list.memberList
                    : [...list.memberList, memberId],
            }));
        },
        removeMember: ({ listId, memberId }) => {
            setData((current) =>
                current.map((list) =>
                    list.id === listId
                        ? {
                            ...list,
                            memberList: list.memberList.filter((id) => id !== memberId),
                        }
                        : list
                )
            );
        },
    };

    const value = {
        data: filteredData,
        handlerMap,
        showResolved,
        toggleShowResolved: () => setShowResolved((current) => !current),
    };

    return (
        <ListDetailContext.Provider value={value}>
            {children}
        </ListDetailContext.Provider>
    );
}

export default ListDetailProvider;