import * as yup from 'yup'

export const createTaskSchema = yup.object().shape({
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