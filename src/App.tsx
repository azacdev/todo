import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Todo from "./components/todo";
import EditTask from "./components/edit-task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Training at the gym", completed: true },
    { id: "2", text: "Play paddle with friends", completed: false },
    { id: "3", text: "Burger BBQ with family", completed: false },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  interface Task {
    id: string;
    text: string;
    completed: boolean;
  }

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask: Task = {
        id: uuidv4(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleStartEditing = (task: Task) => {
    setEditingTask(task);
  };

  const handleEditTask = (id: string, newText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleSaveTask = (newText: string) => {
    if (editingTask) {
      handleEditTask(editingTask.id, newText);
      setEditingTask(null);
    }
  };

  return (
    <div className="flex justify-center screen">
      <Todo
        tasks={tasks}
        inputValue={inputValue}
        handleAddTask={handleAddTask}
        handleStartEditing={handleStartEditing}
        handleToggleComplete={handleToggleComplete}
        setInputValue={setInputValue}
      />

      <EditTask
        editingTask={editingTask}
        handleDeleteTask={handleDeleteTask}
        handleSaveTask={handleSaveTask}
      />
    </div>
  );
}

export default App;
