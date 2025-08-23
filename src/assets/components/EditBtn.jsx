export default function EditBtn({startEditing, index}) {
  return (
    <button className="btn btn-edit" onClick={() => startEditing(index)}>
      ✏️
    </button>
  );
}
