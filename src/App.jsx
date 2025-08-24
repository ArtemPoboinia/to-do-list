import "./App.css";
import CreateNewTask from "./components/CreateNewTask";
import TaskItem from "./components/TaskItem";
import { useTasks } from "./hooks/usetask";

export default function App() {
  const {
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
  } = useTasks();

  return (
    <div className="app">
      <h1 className="title">📝 Список задач</h1>

      <CreateNewTask
        newTask={newTask}
        setNewTask={setNewTask}
        handleNewTaskKey={handleNewTaskKey}
        addTask={addTask}
        newTaskRef={newTaskRef}
      />

      <ul className="task-list">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            editingIndex={editingIndex}
            editingValue={editingValue}
            setEditingValue={setEditingValue}
            editRef={editRef}
            toggleTask={toggleTask}
            startEditing={startEditing}
            saveTask={saveTask}
            deleteTask={deleteTask}
            handleEditTaskKey={handleEditTaskKey}
          />
        ))}
      </ul>
    </div>
  );
}
