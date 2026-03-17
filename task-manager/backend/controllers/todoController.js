const {getAllTodos, saveTodos} = require('../models/todoModel')

// Get: Get all Todos
exports.getTodos = (req, res) => {
    try {
        const todos = getAllTodos()
        res.status(200).json(todos)
    } catch {
        res.status(500).json({message: "Error reading data"})
    }
}

// POST: Create a todo
exports.createTodo = (req, res) => {
    try {
        const { title, description, completed, priority, dueDate } = req.body

        if (!title) {
            return res.status(400).json({ message: "Title is required!" })
        }

        const todos = getAllTodos()

        const maxId = todos.length > 0
            ? Math.max(...todos.map(t => t.id))
            : 0

        const newTodo = {
            id: maxId + 1,
            title,
            description,
            completed: completed ?? false,
            createdAt: new Date().toISOString(),
            priority,
            dueDate: dueDate || null
        }

        todos.push(newTodo)
        saveTodos(todos)

        res.status(201).json(newTodo)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error saving todo" })
    }
};



// DELETE: Remove a todo
exports.deleteTodo =  (req, res) => {
    try {
        const id = Number(req.params.id);
        const todos = getAllTodos();
        
        const filteredTodos = todos.filter(t => t.id !=+ id)
        
        if (todos.length === filteredTodos.length) {
            return res.status(404).json({ message: "Todo not found" })
        }

        saveTodos(filteredTodos);
        res.status(200).json({ message: "Todo deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo" })
    }
}

// PUT: Update a todo
exports.updateTodo = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, description, priority } = req.body
        const todos = getAllTodos()
        
        const todoIndex = todos.findIndex(t => t.id === id)
        
        if (todoIndex === -1) {
            return res.status(404).json({ message: "Todo not found" })
        }

        if (title !== undefined) todos[todoIndex].title = title
        if (description !== undefined) todos[todoIndex].description = description
        if (priority !== undefined) todos[todoIndex].priority = priority

        saveTodos(todos);
        res.status(200).json(todos[todoIndex]);
    } catch (error) {
        res.status(500).json({ message: "Error updating todo" })
    }
};


exports.toggleTodo =  (req, res) => {
    try {
        const id = Number(req.params.id);
        const todos = getAllTodos()
        
        const todoIndex = todos.findIndex(t => t.id === id)
        
        if (todoIndex === -1) {
            return res.status(404).json({ message: "Todo not found" })
        }

        todos[todoIndex].completed = !todos[todoIndex].completed;
        
        saveTodos(todos);
        res.status(200).json(todos[todoIndex])
    } catch (error) {
        res.status(500).json({ message: "Error updating status" })
    }
}