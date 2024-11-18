function Member({ data, handlerMap, isOwner, showRemoveButton, listId }) {
  return (
      <div>
        {data.name}
        {isOwner ? " (Owner) " : " "}
        {showRemoveButton ? (
            <button onClick={() => handlerMap.removeMember({ listId, memberId: data.id })}>
              Remove
            </button>
        ) : null}
      </div>
  );
}

export default Member;
