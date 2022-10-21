import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
    CustomSafeArea,
    CustomStatusBar,
    CustomText,
    CustomView,
    Loader,
} from '~Components';
import { realmContext, RMovie } from '~Storage/Realm';
const { useQuery, useRealm, useObject } = realmContext;
import { ethers } from 'ethers';
import { ethersProvider } from '../../index';

export const HomeScreen = () => {
    // [START] - REALM
    const realm = useRealm();

    // get all by model
    const movies = useQuery<RMovie>('RMovie');
    console.log('all movies: ', movies);

    // Gget by object id
    const movie = useObject<RMovie>('RMovie', '1');
    console.log('movie: ', movie);

    const realmWrite = () => {
        const obj = { id: '3', title: 'a Movie' };
        realm.write(() => {
            realm.create(RMovie.name, obj);
        });
    };

    const realmDelete = () => {
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey(RMovie.name, '2'));
        });
    };
    // [END] - REALM

    const [address, setAddress] = useState('');
    const [mnemonic, setMnemmonic] = useState('');
    const [funds, setFunds] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const createWallet = useCallback(async () => {
        const wallet = ethers.Wallet.fromMnemonic(
            'rely spot column badge lunch forest question about ketchup produce misery angry',
        );
        const connectedWallet = wallet.connect(ethersProvider);
        setAddress(connectedWallet.address);
        setMnemmonic(connectedWallet.mnemonic.phrase);
        const balance = await ethersProvider.getBalance(
            connectedWallet.address,
        );
        setFunds(ethers.utils.formatEther(ethers.BigNumber.from(balance)));
        setIsLoading(false);
    }, []);

    return (
        <CustomView container justify="flex-start">
            <CustomStatusBar />
            <CustomSafeArea />

            <CustomText font="title">My Wallet</CustomText>

            {!address && (
                <TouchableOpacity
                    onPress={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                            // fast hack for syncronous function
                            createWallet();
                        }, 200);
                    }}
                    style={s.button}>
                    <CustomText font="body" color="white">
                        Get Wallet
                    </CustomText>
                </TouchableOpacity>
            )}

            <CustomView align="flex-start" mg={[40, 20, 0, 20]}>
                <CustomView align="flex-start" mg={[0, 0, 20, 0]}>
                    <CustomText font="body" bold>
                        My Address
                    </CustomText>
                    <CustomText font="body">{address}</CustomText>
                </CustomView>

                <CustomView align="flex-start" mg={[0, 0, 20, 0]}>
                    <CustomText font="body" bold>
                        My Seed phrase
                    </CustomText>
                    <CustomText font="body">{mnemonic}</CustomText>
                </CustomView>

                <CustomView align="flex-start" mg={[0, 0, 20, 0]}>
                    <CustomText font="body" bold>
                        My Eth
                    </CustomText>
                    <CustomText font="body">{funds}</CustomText>
                </CustomView>
            </CustomView>

            {isLoading && (
                <Loader>
                    <CustomView align="center" mg={[140, 20, 0, 20]}>
                        <CustomText font="title" mg={[0, 0, 20, 0]}>
                            Creating wallet ...
                        </CustomText>

                        <CustomText font="body" align="center">
                            Creating wallet from mnemonic. The operation is NOT
                            optimized for performance yet because it uses the
                            default ethersJS library for pbkdf2 and it takes
                            about 45 seconds. Be patient please 🥹
                        </CustomText>
                    </CustomView>
                </Loader>
            )}
        </CustomView>
    );
};

const s = StyleSheet.create({
    button: {
        backgroundColor: '#ff5f60',
        paddingHorizontal: 60,
        paddingVertical: 20,
        marginTop: 40,
        borderRadius: 6,
    },
});
