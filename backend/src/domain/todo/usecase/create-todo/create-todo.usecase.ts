import Todo from "../../entity/todo";
import TodoRepositoryInterface from "../../repository/todo-repository.interface";
import {
  CreateTodoInputDto,
  CreateTodoOutputDto,
} from "./create-todo.usecase.dto";

export default class CreateTodoUseCase {
  private _todoRepository: TodoRepositoryInterface;

  constructor(todoRepository: TodoRepositoryInterface) {
    this._todoRepository = todoRepository;
  }

  async execute(input: CreateTodoInputDto): Promise<CreateTodoOutputDto> {
    const props = {
      title: input.title,
      description: input.description,
      favorite: input.favorite,
      color: input.color,
    };
    const todo = new Todo(props);

    try {
      await this._todoRepository.create(todo);
    } catch (error) {
      console.log(error);
    }

    return {
      id: todo.id.id,
      title: todo.title,
      description: todo.description,
      favorite: todo.favorite,
      color: todo.color,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }
}
