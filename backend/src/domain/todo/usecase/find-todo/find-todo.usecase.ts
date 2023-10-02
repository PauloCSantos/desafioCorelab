import TodoRepositoryInterface from "../../repository/todo-repository.interface";
import { FindTodoInputDto, FindTodoOutputDto } from "./find-todo.usecase.dto";

export default class FindTodoUseCase {
  private _todoRepository: TodoRepositoryInterface;

  constructor(todoRepository: TodoRepositoryInterface) {
    this._todoRepository = todoRepository;
  }

  async execute(input: FindTodoInputDto): Promise<FindTodoOutputDto> {
    const result = await this._todoRepository.find(input.id);
    if (!result) throw new Error("Nenhum todo encontrado");

    return {
      id: result.id.id,
      title: result.title,
      description: result.description,
      favorite: result.favorite,
      color: result.color,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }
}
