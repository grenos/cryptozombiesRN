import { createRealmContext } from '@realm/react';
import { RWallet } from './Models/Wallet';

const config = {
    schema: [RWallet],
};

process.env.NODE_ENV === 'development' &&
    console.log('--- :: REALM PATH :: --- ', Realm.defaultPath);

export const realmContext = createRealmContext(config);
export { RWallet };
