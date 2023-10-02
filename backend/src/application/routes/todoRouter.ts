import { Router } from "express";
import TodoRepository from "../../infraestructure/database/mysql/todo.repository";
import TodoController from "../controller/TodoController";
import CreateTodoUseCase from "../../domain/todo/usecase/create-todo/create-todo.usecase";
import UpdateTodoUseCase from "../../domain/todo/usecase/update-todo/update-todo.usecase";
import FindTodoUseCase from "../../domain/todo/usecase/find-todo/find-todo.usecase";
import FindAllTodoUseCase from "../../domain/todo/usecase/listAll-todo/findAll-todo.usecase";
import DeleteTodoUseCase from "../../domain/todo/usecase/delete-todo/delete-todo.usecase";

const router = Router();

const todoRepository = new TodoRepository();

const createTodoUseCase = new CreateTodoUseCase(todoRepository);
const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
const findTodoUseCase = new FindTodoUseCase(todoRepository);
const findAllTodoUseCase = new FindAllTodoUseCase(todoRepository);
const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);

const todoController = new TodoController(
  createTodoUseCase,
  updateTodoUseCase,
  findTodoUseCase,
  findAllTodoUseCase,
  deleteTodoUseCase
);

router.get("/todo/:id", (req,res) => todoController.findTodo(req,res));
router.get("/todos", (req,res) => todoController.findAllTodo(req,res));
router.delete("/todo", (req,res) => todoController.deleteTodo(req,res));
router.post("/todo", (req,res) => todoController.createTodo(req,res));
router.patch("/todo", (req,res) => todoController.updateTodo(req,res));

export default router