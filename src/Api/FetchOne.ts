import { IApiResponse } from '~Types';
import { Api } from '~Utils';
import { createHeaders } from './Helpers';

export const FetchOne = async <T>(
    endpoint: string,
): Promise<IApiResponse<T>> => {
    const url = `${Api.base}/${endpoint}`;
    const res = await fetch(url, createHeaders('GET'));
    if (res.ok) {
        return await res.json();
    }
    throw new Error(res.statusText);
};

/*


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

*/
