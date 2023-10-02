import Todo from "../entity/todo";

export default interface TodoRepositoryInterface {
  create(todo: Todo): Promise<Todo>;
  update(id: string, todo: Partial<Todo>): Promise<void>;
  find(id: string): Promise<Todo>;
  findAll(): Promise<Todo[]>;
  delete(id: string): Promise<string>;
}
