import TodoRepositoryInterface from "../../repository/todo-repository.interface";
import { FindAllTodoOutputDto } from "./findAll-todo.usecase.dto";

type TodoType = {
  id: string;
  title: string;
  description: string | null;
  favorite: boolean;
  color: string;
  createdAt: Date;
  updatedAt: Date;
};

export default class findAllTodoUseCase {
  private _todoRepository: TodoRepositoryInterface;

  constructor(todoRepository: TodoRepositoryInterface) {
    this._todoRepository = todoRepository;
  }

  async execute(): Promise<FindAllTodoOutputDto> {
    const result = await this._todoRepository.findAll();
    let todos: TodoType[] = [];
    if (result.length === 0) throw new Error("Nenhum todo encontrado");

    result.map((todo) => {
      todos.push({
        id: todo.id.id,
        title: todo.title,
        description: todo.description,
        favorite: todo.favorite,
        color: todo.color,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });
    });

    return { todos };
  }
}
