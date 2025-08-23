export default function DeleteBtn({ deleteTask, index }) {
  return (
    <button className="btn btn-delete" onClick={() => deleteTask(index)}>
      🗑️
    </button>
  );
}
