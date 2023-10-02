import TodoRepositoryInterface from "../../repository/todo-repository.interface";
import { UpdateTodoInputDto } from "./update-todo.usecase.dto";

export default class UpdateTodoUseCase {
  private _todoRepository: TodoRepositoryInterface;

  constructor(todoRepository: TodoRepositoryInterface) {
    this._todoRepository = todoRepository;
  }

  async execute(input: UpdateTodoInputDto): Promise<void> {
    const todo = await this._todoRepository.find(input.id);
    if (!todo) throw new Error("Nenhum todo encontrado");
    if (input.title) todo.title = input.title;
    if (input.description) todo.description = input.description;
    if (input.favorite !== todo.favorite) todo.toggle();
    if (input.color) todo.color = input.color;
    todo.updatedAt = new Date();
   
    await this._todoRepository.update(input.id, todo);
    return 
  }
}
