import React, { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const newTaskRef = useRef(null);

  useEffect(() => {
    if (newTaskRef.current) {
      newTaskRef.current.style.height = "32px";
      newTaskRef.current.style.height = newTaskRef.current.scrollHeight + "px";
    }
  }, [newTask]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingValue(tasks[index].text);
  };

  const saveTask = (index) => {
    if (editingValue.trim() === "") return;
    const updated = [...tasks];
    updated[index].text = editingValue;
    setTasks(updated);
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleNewTaskKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addTask(e);
    }
  };

  const handleEditTaskKey = (e, index) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveTask(index);
    }
  };

  return (
    <div className="app">
      <form className="task-form">
        <textarea
          ref={newTaskRef}
          className="task-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleNewTaskKey}
          placeholder="Введи новую задачу..."
          rows={1}
        />
        <button className="btn btn-add" onClick={addTask}>
          Добавить
        </button>
      </form>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li className="task-item" key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />

            {editingIndex === index ? (
              <textarea
                className="task-edit"
                value={editingValue}
                onChange={(e) => {
                  setEditingValue(e.target.value);
                  e.target.style.height = "32px";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onKeyDown={(e) => handleEditTaskKey(e, index)}
                autoFocus
                rows={1}
              />
            ) : (
              <span
                className={`task-text ${
                  task.completed ? "task-completed" : ""
                }`}
              >
                {task.text}
              </span>
            )}

            <div className="task-actions">
              {editingIndex === index ? (
                <button
                  className="btn btn-save"
                  onClick={() => saveTask(index)}
                >
                  Сохранить
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-edit"
                    onClick={() => startEditing(index)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteTask(index)}
                  >
                    Удалить
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
