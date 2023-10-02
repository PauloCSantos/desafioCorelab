export interface CreateTodoInputDto {
    title: string;
    description?: string;
    favorite?: boolean;
    color?: string;
}

export interface CreateTodoOutputDto {
    id: string;
    title: string;
    description: string | null;
    favorite: boolean;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}