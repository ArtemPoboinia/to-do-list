export default function CreateNewTask({
  newTask,
  setNewTask,
  handleNewTaskKey,
  addTask,
  newTaskRef,
}) {
  return (
    <form onSubmit={addTask} className="task-form">
      <textarea
        ref={newTaskRef}
        className="task-input"
        placeholder="Напиши задачу..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleNewTaskKey}
        rows={1}
      />
      <button type="submit" className="btn btn-add">
        Добавить
      </button>
    </form>
  );
}
