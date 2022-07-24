import { Realm } from '@realm/react';

export class RMovie extends Realm.Object {
    id!: string;
    poster!: string;
    title!: string;
    released_on!: string;
    length!: string;
    imdb_rating!: number;
    classification!: string;
    cast!: string[];
    slug!: string;
    genres!: string[];
    director!: string[];
    backdrop!: string;
    overview!: string;
    timeAdded!: string;

    static generate() {
        return {
            id: '',
            poster: '',
            title: '',
            released_on: '',
            length: '',
            imdb_rating: 0,
            classification: '',
            cast: [],
            slug: '',
            genres: '',
            director: [],
            backdrop: '',
            overview: '',
            timeAdded: new Date(),
        };
    }

    static schema = {
        name: 'RMovie',
        primaryKey: 'id',
        properties: {
            id: 'string',
            poster: 'string',
            title: 'string',
            released_on: 'string',
            length: 'string',
            imdb_rating: 'float',
            classification: 'string',
            cast: 'string[]',
            slug: 'string',
            genres: 'string[]',
            director: 'string[]',
            backdrop: 'string',
            overview: 'string',
            timeAdded: 'string',
        },
    };
}
