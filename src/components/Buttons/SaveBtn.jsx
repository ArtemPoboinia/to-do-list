export default function SaveBtn({ saveTask, index }) {
  return (
    <button className="btn btn-save" onClick={() => saveTask(index)}>
      💾
    </button>
  );
}
