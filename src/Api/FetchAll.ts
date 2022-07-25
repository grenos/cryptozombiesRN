import { IApiResponse } from '~Types';
import { Api } from '~Utils';
import { createHeaders } from './Helpers';

export const FetchAll = async <T>(
    endpoint: string,
): Promise<IApiResponse<T[]>> => {
    const url = `${Api.base}/${endpoint}`;
    const res = await fetch(url, createHeaders('GET'));
    if (res.ok) {
        return await res.json();
    }
    throw new Error(res.statusText);
};
