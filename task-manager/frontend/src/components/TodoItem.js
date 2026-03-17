import React, { useState } from "react";
import "../styles/TodoItem.css";

function TodoItem({ todo, onDelete, onUpdate, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: todo.title,
    description: todo.description || "", 
    dueDate: todo.dueDate || "",
    priority: todo.priority || "medium",
  });

  const handleSave = () => {
    onUpdate(todo.id, editForm)
    setIsEditing(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const dateObj = todo.createdAt ? new Date(todo.createdAt) : new Date()
  const formattedDate = isNaN(dateObj.getTime())
    ? "No date"
    : dateObj.toLocaleDateString("en-UK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-mode">
          <div className="form-group">
            <label htmlFor="edit-title">Task Title</label>
            <input
              id="edit-title"
              name="title"
              value={editForm.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-desc">Description</label>
            <textarea
              id="edit-desc"
              name="description"
              value={editForm.description}
              onChange={handleChange}
              placeholder="Add more details..."
              rows="2"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-date">Due Date</label>
              <input
                id="edit-date"
                type="date"
                name="dueDate"
                value={editForm.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-priority">Priority</label>
              <select
                id="edit-priority"
                name="priority"
                value={editForm.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="display-mode">
          <div className="todo-content">
            <span className={`priority-dot ${todo.priority}`}></span>
            <h3 className={todo.completed ? "strikethrough" : ""}>
              {todo.title}
            </h3>

            {todo.description && (
              <p
                className={`todo-description ${todo.completed ? "strikethrough" : ""}`}
              >
                {todo.description}
              </p>
            )}

            <p className="timestamp">Added: {formattedDate}</p>
            {todo.dueDate && <p className="due-date">Due: {todo.dueDate}</p>}
            <span className={`badge ${todo.priority}`}>{todo.priority}</span>
          </div>

          <div className="item-actions">
            <button className="toggle-btn" onClick={() => onComplete(todo.id)}>
              {todo.completed ? "Reopen" : "Done"}
            </button>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoItem
