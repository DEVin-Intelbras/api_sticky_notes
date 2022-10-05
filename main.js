const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()

app.use(express.json())

let tasks = []

app.get('/', (request, response) => {
  response.send("<h1 style='color:red'>ola mundo</h1")
  // response.redirect("https://www.npmjs.com/package/nodemon")
})

app.get('/tasks', (request, response) => {
  response.json(tasks)
})

// BODY
app.post('/tasks', (request, response) => {

  const task = {
    id: uuidv4(),
    title: request.body.title,
    description: request.body.description,
    limit_date: request.body.limit_date,
    status: false,
    created_at: new Date().toLocaleDateString('pt-BR')
  }

  tasks.push(task)

  response.status(201).json(task)
})


app.delete('/tasks/:id', (request, response) => {
  const tasksFiltered = tasks.filter(task => task.id !== request.params.id)
  tasks = [...tasksFiltered]
  response.json()
})


app.get('/tasks/:id', (request, response) => {
    const task = tasks.find(task => task.id === request.params.id)

    if(!task) {
      return response.status(404).json({error: 'Desculpe, esse item não foi encontrado!'})
    }
    
    response.json(task)
})


app.listen(3333, () => {
  console.log('Servidor Online')
})