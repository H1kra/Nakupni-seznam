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
        {data.itemList.map((item) => (
          <Item key={item.id} data={item} handlerMap={handlerMap} />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
