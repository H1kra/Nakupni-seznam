import { createContext, useState, useEffect, useContext } from "react";
import { getLists, createList, updateList, deleteList } from "../api";
import { UserContext } from "../User/UserProvider";

export const ListDetailContext = createContext();

function ListDetailProvider({ children }) {
    const [data, setData] = useState([]);
    const [showResolved, setShowResolved] = useState(false);
    const { loggedInUser } = useContext(UserContext); // Access loggedInUser from UserContext

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lists = await getLists();
                setData(lists);
            } catch (error) {
                console.error("Error fetching lists:", error);
            }
        };
        fetchData();
    }, []); // Empty dependency array means this runs once when the component mounts

    // Update the list in state after a successful update
    const updateListState = (id, callback) => {
        setData((current) =>
            current.map((list) => (list._id === id ? callback(list) : list))
        );
    };

    // Handlers for CRUD operations
    const handlerMap = {
        createList: async (newList) => {
            try {
                // Include the loggedInUser as the ownerId
                const createdList = await createList({ ...newList, ownerId: loggedInUser });
                setData((current) => [...current, createdList]); // Add to the state
            } catch (error) {
                console.error("Error creating list:", error);
            }
        },
        updateList: async (id, updatedData) => {
            try {
                const updatedList = await updateList(id, updatedData); // Update the list
                updateListState(id, () => updatedList); // Update in state
            } catch (error) {
                console.error("Error updating list:", error);
            }
        },
        deleteList: async (id) => {
            try {
                await deleteList(id); // Delete the list
                setData((current) => current.filter((list) => list._id !== id)); // Remove from state
            } catch (error) {
                console.error("Error deleting list:", error);
            }
        },
    };

    const value = {
        data,
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