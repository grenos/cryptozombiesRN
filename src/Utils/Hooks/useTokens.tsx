/* eslint-disable no-new */
import { useCallback, useEffect } from 'react';
import { getTokenBalance } from '~Web3';
import { realmContext, RToken } from '~Storage/Realm';
import { Tokens } from '~Web3';
const { useRealm } = realmContext;

export const useTokens = (address: string) => {
    const realm = useRealm();

    const fetchTokens = useCallback(() => {
        Tokens.forEach(async token => {
            const balance = await getTokenBalance(token.address, address);
            realm.write(() => {
                new RToken(realm, {
                    ...token,
                    balance: balance.toString(),
                });
            });
        });
    }, [address, realm]);

    useEffect(() => {
        fetchTokens();
    }, [fetchTokens]);
};
