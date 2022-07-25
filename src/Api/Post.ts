import { Api } from '~Utils';
import { createHeaders } from './Helpers';

export const Post = async <T>(endpoint: string, body: any = {}): Promise<T> => {
    const url = `${Api.base}/${endpoint}`;
    const res = await fetch(url, createHeaders('POST', body));
    if (res.ok) {
        return true as T;
    }
    throw new Error(res.statusText);
};
