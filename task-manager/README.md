
# How To run

# Go into backend and install
cd backend && npm install

# Go into frontend and install
cd ../frontend && npm install

# Run Backend
cd backend
node server.js

# Run Frontend
cd frontend
npm start



# API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/tasks` | Get all tasks |
| **POST** | `/api/tasks` | Create a new task |
| **PUT** | `/api/tasks/:id` | Update a task |
| **DELETE** | `/api/tasks/:id` | Delete a task |
| **PATCH** | `/api/tasks/:id/toggle` | Toggle task completion status |