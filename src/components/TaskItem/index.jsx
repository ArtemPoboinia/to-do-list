import SaveBtn from "../Buttons/SaveBtn";
import EditBtn from "../Buttons/EditBtn";
import DeleteBtn from "../Buttons/DeleteBtn";

export default function TaskItem({
  task,
  index,
  editingIndex,
  editingValue,
  setEditingValue,
  editRef,
  toggleTask,
  startEditing,
  saveTask,
  deleteTask,
  handleEditTaskKey,
}) {
  return (
    <li className={`task-item ${task.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => toggleTask(index)}
      />

      {editingIndex === index ? (
        <textarea
          ref={editRef}
          className="task-edit"
          value={editingValue}
          onChange={(e) => {
            setEditingValue(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          onKeyDown={(e) => handleEditTaskKey(e, index)}
          rows={1}
        />
      ) : (
        <span className={`task-text ${task.completed ? "task-completed" : ""}`}>
          {task.text}
        </span>
      )}

      <div className="task-actions">
        {editingIndex === index ? (
          <SaveBtn saveTask={saveTask} index={index} />
        ) : (
          <>
            <EditBtn startEditing={startEditing} index={index} />
            <DeleteBtn deleteTask={deleteTask} index={index} />
          </>
        )}
      </div>
    </li>
  );
}
