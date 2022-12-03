import { Realm } from '@realm/react';

export class RToken extends Realm.Object<RToken> {
    address!: string;
    chainId!: number;
    decimals!: number;
    logoURI!: string;
    name!: string;
    symbol!: string;
    balance!: string;

    static generate() {
        return {
            address: '',
            seed: '',
            chainId: 0,
            decimals: 0,
            logoURI: '',
            name: '',
            symbol: '',
            balance: '',
        };
    }

    static schema = {
        name: 'RToken',
        primaryKey: 'address',
        properties: {
            address: 'string',
            chainId: 'int',
            decimals: 'int',
            logoURI: 'string',
            name: 'string',
            symbol: 'string',
            balance: 'string',
        },
    };
}
