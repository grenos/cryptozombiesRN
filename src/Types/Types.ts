export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface IApiResponse<T> {
    data?: T;
}

export type Zombie = {
    name: string;
    dna: number;
    level: number;
    readyTime: number;
    winCount: number;
    lossCount: number;
    index?: number;
};

export type Token = {
    address: string;
    chainId: number;
    decimals: number;
    logoURI: string;
    name: string;
    symbol: string;
    balance?: string;
};
