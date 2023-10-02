type TodoType = {
  id: string;
  title: string;
  description: string | null;
  favorite: boolean;
  color: string;
  createdAt: Date;
  updatedAt: Date;
};
export interface FindAllTodoOutputDto {
  todos: TodoType[];
}
