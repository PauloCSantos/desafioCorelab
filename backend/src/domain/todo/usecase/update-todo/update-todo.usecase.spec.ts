import Todo from "../../entity/todo";
import UpdateTodoUseCase from "./update-todo.usecase";

const todo = new Todo({ title: "Meu todo", description: "Meu primeiro todo" });

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(todo)),
    findAll: jest.fn(),
    delete: jest.fn(),
  };
};

describe("Update Todo Usecase unit test", () => {
  it("should update a todo", async () => {
    const repository = MockRepository();
    const usecase = new UpdateTodoUseCase(repository);

    const input = {
      id: "1",
      title: "Meu todo updated",
      description: "updated description",
      favorite: true,
      color: "black",
    };

    await usecase.execute(input);

    expect(repository.update).toHaveBeenCalled
  });
});
