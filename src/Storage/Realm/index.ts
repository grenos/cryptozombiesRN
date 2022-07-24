import { createRealmContext } from '@realm/react';
import { RMovie } from './Models/Movies';

const config = {
    schema: [RMovie],
};

process.env.NODE_ENV === 'development' &&
    console.log('--- :: REALM PATH :: --- ', Realm.defaultPath);

export const realmContext = createRealmContext(config);
export { RMovie };
