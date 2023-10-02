import Id from "../../../domain/@shared/value-object/id.value-object";
import Todo from "../../../domain/todo/entity/todo";
import TodoRepositoryInterface from "../../../domain/todo/repository/todo-repository.interface";
import TodoModel from "./todo.model";

export default class TodoRepository implements TodoRepositoryInterface {
  async create(todo: Todo): Promise<Todo> {
    try {
      await TodoModel.create({
        id: todo.id.id,
        title: todo.title,
        description: todo.description,
        favorite: todo.favorite,
        color: todo.color,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });

      return todo;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, todo: Partial<Todo>): Promise<void> {
    const result = await TodoModel.findOne({ where: { id } });
    if (!result) throw new Error("Nenhum todo encontrado");
    try {
      await TodoModel.update(
        {
          title: todo.title || result.title,
          description: todo.description || result.description,
          favorite: todo.favorite,
          color: todo.color || result.color,
          createdAt: todo.createdAt || result.createdAt,
          updatedAt: todo.updatedAt || result.updatedAt,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return;
    } catch (error) {
      throw error;
    }
  }

  async find(id: string): Promise<Todo> {
    const result = await TodoModel.findOne({ where: { id: id } });
    if (!result) throw new Error("Nenhum todo encontrado");
    const todo = new Todo({
      id: new Id(result.id),
      title: result.title,
      description: result.description,
      favorite: result.favorite,
      color: result.color,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
    return todo;
  }
  async findAll(): Promise<Todo[]> {
    const result = await TodoModel.findAll();
    if (result.length === 0) throw new Error("Nenhum todo encontrado");
    const todos = result.map((tododata) => {
      let todo = new Todo({
        id: new Id(tododata.id),
        title: tododata.title,
        description: tododata.description,
        favorite: tododata.favorite,
        color: tododata.color,
        createdAt: tododata.createdAt,
        updatedAt: tododata.updatedAt,
      });
      return todo;
    });
    return todos;
  }
  async delete(id: string): Promise<string> {
    const result = await TodoModel.findOne({ where: { id: id } });
    if (!result) throw new Error("Nenhum todo encontrado");

    try {
      result.destroy();
      return "Deletado com sucesso";
    } catch (error) {
      throw error;
    }
  }
}
