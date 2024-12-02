import { useState } from "react";
import "../styles/Default.css";
import { FaTrashAlt } from "react-icons/fa";

function Item({ data, handlerMap, listId}) {
  const [value, setValue] = useState(data.name);
  return (
      <div style={{display: "flex", alignItems: "center"}}>
          <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => {
                  handlerMap.updateItemName({listId, itemId: data.id, name: value});
              }}
          />{" "}
          <button
              onClick={() =>
                  handlerMap.toggleResolveItem({listId, itemId: data.id})
          }
          >
              {data.resolved ? "unresolve" : "resolve"}
          </button>
          <div
              style={{border: '1px solid black', borderRadius: '5px'}}
          >
              <FaTrashAlt
                  onClick={() => {
                      console.log("Deleting item with ID:", data.id, "from list ID:", listId);
                      handlerMap.deleteItem({listId, itemId: data.id});
                  }}
            />
        </div>
      </div>
  );
}

export default Item;
