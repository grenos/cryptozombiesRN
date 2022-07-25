export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface IApiResponse<T> {
    data?: T;
}
