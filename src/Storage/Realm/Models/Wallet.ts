import { Realm } from '@realm/react';

export class RWallet extends Realm.Object<RWallet> {
    id!: string;
    address!: string;
    seed!: string;

    static generate() {
        return {
            id: '',
            address: '',
            seed: '',
        };
    }

    static schema = {
        name: 'RWallet',
        primaryKey: 'id',
        properties: {
            id: 'string',
            address: 'string',
            seed: 'string',
        },
    };
}
