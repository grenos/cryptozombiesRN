import { IApiResponse } from '~Types';

export const Fetch = async <T>(): Promise<IApiResponse<T>> => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const res = await fetch(url, {});
    if (res.ok) {
        return await res.json();
    }
    throw new Error('res.statusText');
};

/*
class ApiService<T> {
    constructor(entitySlug: string) {
        this.entitySlug = entitySlug;
    }

    private entitySlug: string;

    getOne = async (id: string): Promise<APIResponse<T>> => {
        const request = await fetch(
            process.env.BE_HOST + this.entitySlug + '/' + id,
        );
        const response = await request.json();
        return response;
    };

	getList = async (): Promise<APIResponse<T[]>> => {
        const request = await fetch(process.env.BE_HOST + this.entitySlug);
        const response = await request.json();
        return response;
    };

    create = async (
        body: Omit<T, 'id' | 'created' | 'updated'>,
    ): Promise<APIResponse<T>> => {
        const request = await fetch(process.env.BE_HOST + this.entitySlug, {
            method: 'POST',
            body: JSON.stringify(body),,
        });

        const response = await request.json();
        return response;
    };

update = async (
        body: Omit<Partial<T>, 'id' | 'created' | 'updated'>,
    ): Promise<APIResponse<T>> => {
        const request = await fetch(
            process.env.BE_HOST + this.entitySlug + '/' + body.id,
            {
                method: 'PATCH',
                body: JSON.stringify(body),,
            },
        );
        const response = await request.json();
        return response;
    };

delete = async (id: string): Promise<void> => {
        const request = await fetch(
            process.env.BE_HOST + this.entitySlug + '/' + id,
            {
                method: 'DELETE',,
            },
        );
        const response = await request.json();
        return response;
    };
}
*/
