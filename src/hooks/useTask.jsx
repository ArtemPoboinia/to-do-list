import { useState, useRef, useEffect } from "react";

export function useTasks() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const newTaskRef = useRef(null);
  const editRef = useRef(null);

  // Авто-рост textarea для новой задачи
  useEffect(() => {
    if (newTaskRef.current) {
      const el = newTaskRef.current;
      el.style.height = "40px";
      el.style.height = el.scrollHeight + "px";
    }
  }, [newTask]);

  // Авто-рост textarea при редактировании
  useEffect(() => {
    if (editingIndex !== null && editRef.current) {
      const el = editRef.current;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  }, [editingIndex]);

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

  return {
    newTask,
    setNewTask,
    tasks,
    editingIndex,
    editingValue,
    setEditingValue,
    newTaskRef,
    editRef,
    addTask,
    toggleTask,
    deleteTask,
    startEditing,
    saveTask,
    handleNewTaskKey,
    handleEditTaskKey,
  };
}
