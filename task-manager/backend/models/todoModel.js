let todos = [
  {
    "id": 0,
    "title": "Design Landing Page",
    "description": "Create a high-fidelity mockup for the hero section and the features grid. Use the brand's primary blue palette.",
    "dueDate": "2026-03-20",
    "priority": "high",
    "completed": false
  },
  {
    "id": 1,
    "title": "Weekly Team Sync",
    "description": "Discuss project milestones, blockers, and individual tasks for the upcoming sprint. Bring coffee!",
    "dueDate": "2026-03-18",
    "priority": "medium",
    "completed": true
  },
  {
    "id": 2,
    "title": "Refactor TodoList Styles",
    "description": "Clean up redundant CSS variables and ensure the carousel is fully responsive across mobile devices.",
    "dueDate": "2026-03-22",
    "priority": "low",
    "completed": false
  },
  {
    "id": 3,
    "title": "Grocery Shopping",
    "description": "Pick up ingredients for dinner: spinach, heavy cream, pasta, and parmesan cheese for the Alfredo.",
    "dueDate": "2026-03-17",
    "priority": "medium",
    "completed": false
  }
]

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