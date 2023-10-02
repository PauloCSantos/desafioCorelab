export interface FindTodoInputDto {
    id: string;
}

export interface FindTodoOutputDto {
    id: string;
    title: string;
    description: string | null;
    favorite: boolean;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}