import { v4 as uuidv4 } from 'uuid'
import { createTaskSchema } from '../validations/createTask.schema.js'

let tasks = []

export function findAll(request, response) {
  const titleQuery = request.query.title || ""
  const descriptionQuery = request.query.description || ""

  const tasksSearch = tasks.filter(
    task =>
      task.title.toUpperCase().includes(titleQuery.toUpperCase())
      && task.description.toUpperCase().includes(descriptionQuery.toUpperCase())
  )

  return response.json(tasksSearch)
}

export async function create(request, response) {
  try {
    await createTaskSchema.validate(request.body)

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
}

export function destroy(request, response) {
  const tasksFiltered = tasks.filter(task => task.id !== request.params.id)
  tasks = [...tasksFiltered]
  response.json()
}

export function findOne(request, response) {
  const task = tasks.find(task => task.id === request.params.id)

  if (!task) {
    return response.status(404).json({ error: 'Desculpe, esse item não foi encontrado!' })
  }

  response.json(task)
}

export function update(request, response) {
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
}

export function activeOne(request, response) {
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
}