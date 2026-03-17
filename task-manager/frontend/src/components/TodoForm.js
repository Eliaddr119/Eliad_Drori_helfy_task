import React, { useState } from 'react'
import "../styles/TodoForm.css"

function TodoForm({ onAdd }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [priority, setPriority] = useState('medium')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim()) return;

        onAdd({ 
            title, 
            dueDate,
            description, 
            completed: isCompleted, 
            priority 
        });

        setTitle('');
        setDueDate('')
        setDescription('')
        setIsCompleted(false)
        setPriority('medium')
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <h2 className="form-title">Create New Task</h2>
            
            <div className="form-group">
                <label htmlFor="task-title">Task Name</label>
                <input 
                    id="task-title"
                    type="text"  
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="task-desc">Task Description</label>
                <input 
                    id="task-desc"
                    type="text"  
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group flex-1">
                    <label htmlFor="due-date">Due Date</label>
                    <input 
                        id="due-date"
                        type="date" 
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)} 
                    />
                </div>

                <div className="form-group flex-1">
                    <label htmlFor="priority-select">Priority Level</label>
                    <select 
                        id="priority-select" 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            <div className="form-footer">
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                    />
                    <span className="checkbox-label">Start as Completed ?</span>
                </label>

                <button type="submit" className="submit-btn">Add to List</button>
            </div>
        </form>
    );
}

export default TodoForm