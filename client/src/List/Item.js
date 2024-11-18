import { useState } from "react";

function Item({ data, handlerMap, listId}) {
  const [value, setValue] = useState(data.name);
  return (
      <div>
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
          <button
              onClick={() => {
                  console.log("Deleting item with ID:", data.id, "from list ID:", listId);
                  handlerMap.deleteItem({listId, itemId: data.id});
              }}
          >
              Delete
          </button>
      </div>
  );
}

export default Item;
