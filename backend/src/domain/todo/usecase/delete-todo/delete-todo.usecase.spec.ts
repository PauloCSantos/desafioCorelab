import Todo from "../../entity/todo";
import DeleteTodoUseCase from "./delete-todo.usecase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest
      .fn()
      .mockReturnValue(Promise.resolve(new Todo({ title: "Meu todo" }))),
    findAll: jest.fn(),
    delete: jest
      .fn()
      .mockReturnValue(Promise.resolve("Todo deletado com sucesso")),
  };
};

describe("Delete Todo Usecase unit test", () => {
  it("should delete a todo", async () => {
    const repository = MockRepository();
    const usecase = new DeleteTodoUseCase(repository);

    const result = await usecase.execute({ id: "123" });

    expect(result.message).toEqual("Todo deletado com sucesso");
  });
});
