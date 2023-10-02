import Todo from "../../entity/todo";
import FindTodoUseCase from "./find-todo.usecase";

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

// const MockRepository2 = () => {
//   return {
//     create: jest.fn(),
//     update: jest.fn(),
//     find: jest
//       .fn()
//       .mockReturnValue(Promise.reject(new Error("Nenhum todo encontrado"))),
//     findAll: jest.fn(),
//     delete: jest.fn(),
//   };
// };

describe("Find Todo Usecase unit test", () => {
  // it("should not find a todo when use an invalid id", async () => {
  //   const repository = MockRepository2();
  //   const usecase = new FindTodoUseCase(repository);

  //   try {
  //     const result = await usecase.execute({ id: "1" });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       expect(error.message).toBe("Nenhum todo encontrado");
  //       expect(repository.find).toHaveBeenCalledWith("1");
  //     }
  //   }
  // });

  it("should find a todo", async () => {
    const repository = MockRepository();
    const usecase = new FindTodoUseCase(repository);

    const result = await usecase.execute({ id: todo.id.id });

    expect(result.id).toBeDefined;
    expect(result.title).toEqual("Meu todo");
    expect(result.description).toEqual("Meu primeiro todo");
    expect(result.createdAt).toBeDefined;
    expect(result.updatedAt).toBeDefined;
    expect(result.color).toEqual("blue");
    expect(result.favorite).toEqual(false);
  });
});
