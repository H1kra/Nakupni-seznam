import { useContext } from "react";
import { ListDetailContext } from "./ListProvider";
import Item from "./Item";

function ItemList() {
  const { data, handlerMap, showResolved, toggleShowResolved } =
    useContext(ListDetailContext);
  return (
    <div style={{ border: "1px solid grey", margin: "8px", padding: "8px" }}>
      ItemList <button onClick={() => handlerMap.addItem()}>add item</button>
      <button onClick={() => toggleShowResolved()}>
        {showResolved ? "not resolved only" : "all items"}
      </button>
      <div>
          {data.map((list) => (
              <div key={list.id} style={{ marginBottom: "16px" }}>
                  <h4>{list.name}</h4>
                  {list.itemList.map((item) => (
                      <Item key={item.id} data={item} handlerMap={handlerMap} />
                  ))}
              </div>
          ))}
      </div>
    </div>
  );
}

export default ItemList;
