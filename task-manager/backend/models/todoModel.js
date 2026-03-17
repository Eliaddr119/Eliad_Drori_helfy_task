let todos = [{id:0, title: "test", description:"test", completed: true, priority: 'low'}]

const getAllTodos = () => {
    return todos
}

const saveTodos = (newTodos) => {
    todos = newTodos
}

const findTodoById = (id) => {
    return todos.find(t => t.id === id)
};

module.exports = { getAllTodos, saveTodos, findTodoById }