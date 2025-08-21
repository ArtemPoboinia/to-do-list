import React, { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const createTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const completedTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveEdit = (index) => {
    const newTasks = [...tasks];
    newTasks[index].text = editingText;
    setTasks(newTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createTask();
    }
  };

  const handleEditKeyDown = (e, index) => {
    if (e.key === "Enter") {
      saveEdit(index);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введи новую задачу"
      />

      <button onClick={createTask}>Создать</button>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => completedTask(index)}
            />

            {editingIndex === index ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => handleEditKeyDown(e, index)}
                autoFocus
              />
            ) : (
              <span
                style={{
                  flex: 1,
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              >
                {t.text}
              </span>
            )}

            {/* Кнопки */}
            {editingIndex === index ? (
              <button onClick={() => saveEdit(index)}>Сохранить</button>
            ) : (
              <>
                <button onClick={() => startEditing(index)}>
                  Редактировать
                </button>
                <button onClick={() => deleteTask(index)}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
