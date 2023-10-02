import CreateTodoUseCase from "./create-todo.usecase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
  };
};

describe("Create Todo Usecase unit test", () => {
  it("should create a todo", async () => {
    const repository = MockRepository();
    const usecase = new CreateTodoUseCase(repository);

    const input = {
      title: "Meu todo",
      description: "Meu primeiro todo",
    };

    const result = await usecase.execute(input);

    expect(result.id).toBeDefined;
    expect(result.title).toEqual("Meu todo");
    expect(result.description).toEqual("Meu primeiro todo");
    expect(result.createdAt).toBeDefined;
    expect(result.updatedAt).toBeDefined;
    expect(result.color).toEqual("blue");
    expect(result.favorite).toEqual(false);
  });
});
