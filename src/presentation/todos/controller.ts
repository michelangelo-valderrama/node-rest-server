import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
import {
  CreateTodo,
  CustomError,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain"

export class TodosController {
  constructor(private readonly TodoRepository: TodoRepository) {}

  private handleError = (res: Response, err: unknown) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ error: err.message })
    }

    return res.status(500).json({ error: "Internal server error" })
  }

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.TodoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => this.handleError(res, error))
  }

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id

    new GetTodo(this.TodoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => this.handleError(res, error))
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new CreateTodo(this.TodoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => this.handleError(res, error))
  }

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id

    const [error, updateTodoDto] = UpdateTodoDto.create({ id, ...req.body })
    if (error) return res.status(400).json({ error })

    new UpdateTodo(this.TodoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => this.handleError(res, error))
  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id

    new DeleteTodo(this.TodoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => this.handleError(res, error))
  }
}
