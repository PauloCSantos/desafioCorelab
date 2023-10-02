export interface UpdateTodoInputDto {
  id: string;
  title?: string;
  description?: string;
  favorite?: boolean;
  color?: string;
}