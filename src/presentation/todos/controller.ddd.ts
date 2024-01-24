import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
import { TodoRepository } from "../../domain"

export class TodosController {
  constructor(private readonly TodoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.TodoRepository.getAll()
    res.json(todos)
  }

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id

    try {
      const todo = await this.TodoRepository.findById(id)
      return res.json(todo)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) return res.status(400).json({ error })

    const todo = await this.TodoRepository.create(createTodoDto!)
    return res.json(todo)
  }

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id

    const [error, updateTodoDto] = UpdateTodoDto.create({ id, ...req.body })
    if (error) return res.status(400).json({ error })

    const updatedTodo = await this.TodoRepository.updateById(updateTodoDto!)
    return res.json(updatedTodo)
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id
    try {
      const deletedTodo = await this.TodoRepository.deleteById(id)
      return res.json(deletedTodo)
    } catch (error) {
      return res.json({ error })
    }
  }
}
