import express from 'express'
import cors from 'cors'

import tasksRoutes from './routes/tasks.routes.js'
import usersRoutes from './routes/user.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use(tasksRoutes)
app.use(usersRoutes)

app.get('/', (request, response) => {
  response.send("<h1 style='color:red'>ola mundo</h1")
  // response.redirect("https://www.npmjs.com/package/nodemon")
})


export default app