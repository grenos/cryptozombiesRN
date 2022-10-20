import { Realm } from '@realm/react';

export class RMovie extends Realm.Object<RMovie> {
    id!: string;
    title!: string;

    static generate() {
        return {
            id: '',
            title: '',
        };
    }

    static schema = {
        name: 'RMovie',
        primaryKey: 'id',
        properties: {
            id: 'string',
            title: 'string',
        },
    };
}
