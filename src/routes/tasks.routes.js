import { Router } from "express";

import {
  findAll,
  create,
  destroy,
  findOne,
  update,
  activeOne
} from '../controllers/task.controller.js'

const tasksRoutes = Router()

tasksRoutes.get('/tasks', findAll)
tasksRoutes.post('/tasks', create)
tasksRoutes.delete('/tasks/:id', destroy)
tasksRoutes.get('/tasks/:id', findOne)
tasksRoutes.put('/tasks/:id', update)
tasksRoutes.patch('/tasks/:id/active', activeOne)


export default tasksRoutes



