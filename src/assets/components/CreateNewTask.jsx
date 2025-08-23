export default function CreateNewTask({ newTask, setNewTask, handleNewTaskKey, addTask, newTaskRef }) {
  return (
    <form className="task-form">
      <textarea
        ref={newTaskRef}
        className="task-input"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleNewTaskKey}
        placeholder="Введите новую задачу..."
        rows={1}
      />
      <button className="btn btn-add" onClick={addTask}>
        Добавить
      </button>
    </form>
  );
}