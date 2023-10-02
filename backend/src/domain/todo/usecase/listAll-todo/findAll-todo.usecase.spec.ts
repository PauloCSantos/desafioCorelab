import Todo from "../../entity/todo";
import findAllTodoUseCase from "./findAll-todo.usecase";

const todo = new Todo({ title: "Meu todo", description: "Meu primeiro todo" });
const todo2 = new Todo({ title: "Meu todo2", description: "Meu segundo todo" });
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([todo, todo2])),
    delete: jest.fn(),
  };
};

describe("Find All Todo Usecase unit test", () => {
  it("should find all todos", async () => {
    const repository = MockRepository();
    const usecase = new findAllTodoUseCase(repository);

    const result = await usecase.execute();
    expect(result.todos.length).toBe(2);
    expect(result.todos[0].id).toBeDefined;
    expect(result.todos[0].title).toEqual("Meu todo");
    expect(result.todos[0].description).toEqual("Meu primeiro todo");
    expect(result.todos[0].createdAt).toBeDefined;
    expect(result.todos[0].updatedAt).toBeDefined;
    expect(result.todos[0].color).toEqual("blue");
    expect(result.todos[0].favorite).toEqual(false);

    expect(result.todos[1].id).toBeDefined;
    expect(result.todos[1].title).toEqual("Meu todo2");
    expect(result.todos[1].description).toEqual("Meu segundo todo");
    expect(result.todos[1].createdAt).toBeDefined;
    expect(result.todos[1].updatedAt).toBeDefined;
    expect(result.todos[1].color).toEqual("blue");
    expect(result.todos[1].favorite).toEqual(false);
  });
});
