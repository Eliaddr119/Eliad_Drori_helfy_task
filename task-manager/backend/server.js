const express = require('express')
const cors = require('cors')
const todoRoutes = require('./routes/todoRoutes')

const app = express()
const PORT = 4000

// MiddleWare
app.use(cors())
app.use(express.json())
app.use('/api/tasks',todoRoutes)



app.get('/', (req, res) => {
    res.send('API is running')
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});