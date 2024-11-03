function Member({ data, handlerMap, isOwner, showRemoveButton }) {
  return (
    <div>
      {data.name}
      {isOwner ? " (Owner) " : " "}
      {showRemoveButton ? (
        <button onClick={() => handlerMap.removeMember({ memberId: data.id })}>
          remove
        </button>
      ) : null}
    </div>
  );
}

export default Member;
