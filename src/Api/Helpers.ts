import { isEmpty } from 'lodash';

export const createHeaders = (method: string, body: any = {}) => {
    return {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.TOKEN}`,
        },
        body: isEmpty(body) ? null : JSON.stringify(body),
    };
};
