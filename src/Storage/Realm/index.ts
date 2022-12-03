import { createRealmContext } from '@realm/react';
import { RWallet } from './Models/Wallet';
import { RToken } from './Models/Token';

const config = {
    deleteRealmIfMigrationNeeded:
        process.env.NODE_ENV === 'development' ? true : false,
    schema: [RWallet, RToken],
};

process.env.NODE_ENV === 'development' &&
    console.log('--- :: REALM PATH :: --- ', Realm.defaultPath);

export const realmContext = createRealmContext(config);
export { RWallet, RToken };
