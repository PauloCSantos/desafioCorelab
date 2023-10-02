import { Request, Response } from "express";
import CreateTodoUseCase from "../../domain/todo/usecase/create-todo/create-todo.usecase";
import DeleteTodoUseCase from "../../domain/todo/usecase/delete-todo/delete-todo.usecase";
import FindTodoUseCase from "../../domain/todo/usecase/find-todo/find-todo.usecase";
import findAllTodoUseCase from "../../domain/todo/usecase/listAll-todo/findAll-todo.usecase";
import UpdateTodoUseCase from "../../domain/todo/usecase/update-todo/update-todo.usecase";

export default class TodoController {
  constructor(
    private createTodoUseCase: CreateTodoUseCase,
    private updateTodoUseCase: UpdateTodoUseCase,
    private findTodoUseCase: FindTodoUseCase,
    private findAllTodoUseCase: findAllTodoUseCase,
    private deleteTodoUseCase: DeleteTodoUseCase
  ) {}

  async createTodo(req: Request, res: Response) {
    const { title, description, favorite, color } = req.body;
    try {
      const todo = await this.createTodoUseCase.execute({
        title,
        description,
        favorite,
        color,
      });
      if (todo) return res.status(201).json(todo);
    } catch (error) {
      
      return res.status(500).json({ error: "Nao foi possivel criar o Todo" });
    }
  }

  async findTodo(req: Request, res: Response) {
    const { id } = req.params
    try {
      const todo = await this.findTodoUseCase.execute({
        id,
      });
      if (todo) return res.status(201).json(todo);
    } catch (error) {
      
      return res.status(500).json({ error: "Todo nao encontrado" });
    }
  }

  async findAllTodo(req: Request, res: Response) {
    try {
      const todos = await this.findAllTodoUseCase.execute();
      if (todos.todos.length >= 1) {
        return res.status(201).json(todos);
      } else {
        return res.status(500).json({ error: "Nenhum todo encontrado" });
      }
    } catch (error) {
      
      return res.status(500).json({ error: "Nenhum todo encontrado" });
    }
  }

  async updateTodo(req: Request, res: Response) {
    const { id, title, description, favorite, color } = req.body;
    try {
      await this.updateTodoUseCase.execute({
        id,
        title,
        description,
        favorite,
        color,
      });
      return res.sendStatus(200);
    } catch (error) {
      
      return res
        .status(500)
        .json({ error: "Nao foi possivel fazer a atualizacao" });
    }
  }

  async deleteTodo(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const todo = await this.deleteTodoUseCase.execute({
        id,
      });
      return res.status(200).json(todo.message);
    } catch (error) {
      
      return res.status(500).json({ error: "Falha ao deletar Todo" });
    }
  }
}
