import React, { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

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
    const newTasks = tasks.filter((_, i) => i !== index); // фильтруем без выбранной
    setTasks(newTasks);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createTask();
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

            <span
              style={{
                flex: 1,
                textDecoration: t.completed ? "line-through" : "none",
              }}
            >
              {t.text}
            </span>
            <button onClick={() => deleteTask(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
