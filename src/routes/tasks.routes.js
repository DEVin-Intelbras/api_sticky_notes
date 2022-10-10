import { Router } from "express";
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'

import {
  findAll
} from '../controllers/task.controller.js'

const tasksRoutes = Router()

let tasks = []

tasksRoutes.get('/tasks', findAll)


// BODY
tasksRoutes.post('/tasks', async (request, response) => {
  try {
    const schema = yup.object().shape({
      title:
        yup
          .string()
          .min(5, "Título deve conter no mínimo 5 caracteres")
          .max(100)
          .required("Título é obrigatório"),
      description:
        yup
          .string()
          .min(10)
          .max(250)
          .required("Descrição é obrigatória"),
      limit_date: yup
        .string()
    })

    await schema.validate(request.body)

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
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})


tasksRoutes.delete('/tasks/:id', (request, response) => {
  const tasksFiltered = tasks.filter(task => task.id !== request.params.id)
  tasks = [...tasksFiltered]
  response.json()
})


tasksRoutes.get('/tasks/:id', (request, response) => {
  const task = tasks.find(task => task.id === request.params.id)

  if (!task) {
    return response.status(404).json({ error: 'Desculpe, esse item não foi encontrado!' })
  }

  response.json(task)
})

tasksRoutes.put('/tasks/:id', (request, response) => {

  const task = tasks.find(task => task.id === request.params.id)

  if (!task) {
    return response.status(404).json({ error: 'Desculpe, não encontramos essa tarefa.' })
  }

  if (task.status === true) {
    return response.status(401).json({ error: 'Não é permitido atualizar essa tarefa, pois ela já encontra finalizada.' })
  }

  const newTasks = tasks.map(task => {
    if (task.id === request.params.id) {
      task.title = request.body.title
      task.description = request.body.description
      task.limit_date = request.body.limit_date
    }
    return task
  })

  tasks = [...newTasks]

  response.json()
})

tasksRoutes.patch('/tasks/:id/active', (request, response) => {
  const task = tasks.find(task => task.id === request.params.id)

  if (!task) {
    return response.status(404).json({ error: 'Desculpe, não encontramos essa tarefa.' })
  }

  const newTasks = tasks.map(task => {
    if (task.id === request.params.id) {
      task.status = true
    }
    return task
  })

  tasks = [...newTasks]

  response.json()
})


export default tasksRoutes



