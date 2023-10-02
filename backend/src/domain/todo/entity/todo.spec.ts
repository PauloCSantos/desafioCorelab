import Todo from "./todo";

describe("Todo entity unit test", () => {
  it("should throw an error when title is empty", async () => {
    const todo = new Todo({
      title: "Meu todo",
      description: "Meu primeiro todo",
    });

    expect(() => {
      todo.title = "";
    }).toThrowError("Titulo nao pode ser vazio");
  });

  it("should throw an error when color is empty", async () => {
    const todo = new Todo({
      title: "Meu todo",
      description: "Meu primeiro todo",
    });

    expect(() => {
      todo.color = "";
    }).toThrowError("Nenhuma cor selecionada");
  });

  it("should create a todo", async () => {
    const todo = new Todo({
      title: "Meu todo",
      description: "Meu primeiro todo",
    });

    expect(todo.id).toBeDefined;
    expect(todo.title).toEqual("Meu todo");
    expect(todo.description).toEqual("Meu primeiro todo");
    expect(todo.createdAt).toBeDefined;
    expect(todo.updatedAt).toBeDefined;
    expect(todo.color).toEqual("blue");
    expect(todo.favorite).toEqual(false);
  });

  it("should toggle a favorite todo", async () => {
    const todo = new Todo({
      title: "Meu todo",
      description: "Meu primeiro todo",
    });

    expect(todo.favorite).toEqual(false);

    todo.toggle()

    expect(todo.favorite).toEqual(true);
  });
});
