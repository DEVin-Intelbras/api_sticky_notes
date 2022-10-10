// cadastrar - create
// listar varios - findAll
// lista um elemento so - find
// atualiza elementos - update
// deletar elemento - destroy

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
