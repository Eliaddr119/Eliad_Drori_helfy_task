const API_URL = 'http://localhost:4000/api/tasks'

export const fetchTodos = async () => {
    const response = await fetch(API_URL)
    return response.json()
}

export const createTodo = async (todoData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
    })
    return response.json()
}

export const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
}

export const updateTodo = async (id, updatedData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    })
    return response.json()
}

export const toggleTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: 'PUT',
    });
    
    if (!response.ok) throw new Error('Failed to toggle on server');
    
    return response.json(); 
};