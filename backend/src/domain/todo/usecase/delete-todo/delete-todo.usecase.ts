import TodoRepositoryInterface from "../../repository/todo-repository.interface";
import {
  DeleteTodoInputDto,
  DeleteTodoOutputDto,
} from "./delete-todo.usecase.dto";

export default class DeleteTodoUseCase {
  private _todoRepository: TodoRepositoryInterface;

  constructor(todoRepository: TodoRepositoryInterface) {
    this._todoRepository = todoRepository;
  }

  async execute(input: DeleteTodoInputDto): Promise<DeleteTodoOutputDto> {
    const todo = this._todoRepository.find(input.id);
    if (!todo) throw new Error("Id nao encontrado");

    try {
      await this._todoRepository.delete(input.id);
    } catch (error) {
      console.log(error);
    }

    return {
      message: "Todo deletado com sucesso",
    };
  }
}
