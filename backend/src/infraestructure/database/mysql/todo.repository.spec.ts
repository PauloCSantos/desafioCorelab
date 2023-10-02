import { Sequelize } from "sequelize-typescript";
import TodoModel from "./todo.model";
import TodoRepository from "./todo.repository";
import Todo from "../../../domain/todo/entity/todo";

describe("Todo repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      database: "corenotesdatabase",
      username: "root",
      password: "corelab123",
      host: "172.17.0.3",
      dialect: "mysql",
      sync: { force: true },
      logging: false,
    });

    await sequelize.addModels([TodoModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a todo", async () => {
    const todoRepository = new TodoRepository();
    const todo = new Todo({
      title: "Meu todo",
      description: "Meu todo no mysql",
    });
    try {
      await todoRepository.create(todo);
    } catch (error) {
      console.log(error);
    }
    const result = await TodoModel.findOne({ where: { id: todo.id.id } }).then(
      (data) => data?.toJSON()
    );
    expect(result.id).toEqual(todo.id.id);
    expect(result.title).toEqual(todo.title);
    expect(result.description).toEqual(todo.description);
    expect(result.createdAt).toBeDefined;
    expect(result.updatedAt).toBeDefined;
    expect(result.color).toEqual(todo.color);
    expect(result.favorite).toEqual(todo.favorite);
  });

  it("should find a todo", async () => {
    const todoRepository = new TodoRepository();
    const todo = new Todo({
      title: "Meu todo",
      description: "Meu todo no mysql",
    });
    await todoRepository.create(todo);
    let result;
    try {
      result = await todoRepository.find(todo.id.id);
    } catch (error) {
      console.log(error);
    }
    if (result) {
      expect(result.id).toEqual(todo.id);
      expect(result.title).toEqual(todo.title);
      expect(result.description).toEqual(todo.description);
      expect(result.createdAt).toBeDefined;
      expect(result.updatedAt).toBeDefined;
      expect(result.color).toEqual(todo.color);
      expect(result.favorite).toEqual(todo.favorite);
    }
  });

  it("should find all todos", async () => {
    const todoRepository = new TodoRepository();

    const todo = new Todo({
      title: "Meu todo",
      description: "Meu todo no mysql",
    });
    await todoRepository.create(todo);

    const todo2 = new Todo({
      title: "Meu todo2",
      description: "Meu todo no mysql 2",
    });
    await todoRepository.create(todo2);

    let result;
    try {
      result = await todoRepository.findAll();
    } catch (error) {
      console.log(error);
    }
    if (result) {
      expect(result.length).toBe(2);
      expect(result[0].id.id).toEqual(todo.id.id);
      expect(result[0].title).toEqual(todo.title);
      expect(result[0].description).toEqual(todo.description);
      expect(result[0].createdAt).toBeDefined;
      expect(result[0].updatedAt).toBeDefined;
      expect(result[0].color).toEqual(todo.color);
      expect(result[0].favorite).toEqual(todo.favorite);
      expect(result[1].id.id).toEqual(todo2.id.id);
      expect(result[1].title).toEqual(todo2.title);
      expect(result[1].description).toEqual(todo2.description);
      expect(result[1].createdAt).toBeDefined;
      expect(result[1].updatedAt).toBeDefined;
      expect(result[1].color).toEqual(todo2.color);
      expect(result[1].favorite).toEqual(todo2.favorite);
    }
  });

  it("should update a todo", async () => {
    const todoRepository = new TodoRepository();
    const todo = new Todo({
      title: "Meu todo",
      description: "Meu todo no mysql",
    });
    await todoRepository.create(todo);

    todo.title = "Novo titulo";
    todo.description = "Nova descricao";
    todo.color = "white";
    todo.toggle();
    todo.updatedAt = new Date();
    const partialTodo = {
      title: todo.title,
      description: todo.description,
      color: todo.color,
      favorite: todo.favorite,
      updatedAt: todo.updatedAt,
    };
    try {
      await todoRepository.update(todo.id.id, partialTodo);
    } catch (error) {
      console.log(error);
    }

    const result = await todoRepository.find(todo.id.id);

    expect(result.id.id).toEqual(todo.id.id);
    expect(result.title).toEqual(todo.title);
    expect(result.description).toEqual(todo.description);
    expect(result.createdAt).toBeDefined;
    expect(result.updatedAt).toBeDefined;
    expect(result.color).toEqual(todo.color);
    expect(result.favorite).toEqual(todo.favorite);
  });

  it("should delete a todo", async () => {
    const todoRepository = new TodoRepository();
    const todo = new Todo({
      title: "Meu todo",
      description: "Meu todo no mysql",
    });

    await todoRepository.create(todo);

    let result;
    try {
      result = await todoRepository.delete(todo.id.id);
    } catch (error) {
      console.log(error)
    }

    expect(result).toEqual("Deletado com sucesso");
   
  });
});
