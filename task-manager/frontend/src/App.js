import React, { useState, useEffect } from "react";
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  toggleTodo,
} from "./services/api";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoFilter from "./components/TodoFilter";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  
  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []); 

  const totalTasks = todos.length;
  const pendingTasks = todos.filter(t => !t.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleAddTodo = async (taskData) => {
    const newTodo = await createTodo(taskData);
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdate = async (id, updatedData) => {
    const updatedTodo = await updateTodo(id, updatedData);
    setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
  };

  const handleComplete = async (id) => {
    const updatedTodo = await toggleTodo(id);
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === id ? updatedTodo : t))
    );
  };

  return (
    <div className="App">
      <header>
        <h1>Task Manager - By Eliad Drori</h1>
        <p className="subtitle">Manage your tasks</p>
      </header>

      <section className="form-section">
        <TodoForm onAdd={handleAddTodo} />
      </section>

      <div className="stats-container">
        <div className="stat-card total">
          <label>Total Tasks</label>
          <div className="stat-value">{totalTasks}</div>
        </div>
        <div className="stat-card pending">
          <label>Pending</label>
          <div className="stat-value">{pendingTasks}</div>
        </div>
      </div>

      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

      <main>
        <TodoList
          todos={filteredTodos}
          onComplete={handleComplete}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </main>
    </div>
  );
}

export default App;