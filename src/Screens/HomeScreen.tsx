/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
    CustomSafeArea,
    CustomStatusBar,
    CustomText,
    CustomView,
    Loader,
} from '~Components';
import { ethersProvider, WalletGlobal } from '../../index';
import { ethers } from 'ethers';

export const HomeScreen = () => {
    const [funds, setFunds] = useState('');
    const [address, setAddress] = useState('');
    const [seed, setSeed] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const createWallet = useCallback(async () => {
        try {
            const _wallet = ethers.Wallet.fromMnemonic(
                'rely spot column badge lunch forest question about ketchup produce misery angry',
            );
            const connectedWallet = _wallet.connect(ethersProvider);
            const _ = new WalletGlobal(connectedWallet);
            const balance = await ethersProvider.getBalance(
                connectedWallet.address,
            );
            setFunds(ethers.utils.formatEther(ethers.BigNumber.from(balance)));
            setAddress(connectedWallet.address);
            setSeed(connectedWallet.mnemonic.phrase);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, []);

    return (
        <CustomView container flex justify="flex-start">
            <CustomStatusBar />
            <CustomSafeArea />

            <CustomText font="title">My Wallet</CustomText>
            <CustomText font="caption">Sepolia</CustomText>

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
                    <CustomText font="body">{seed}</CustomText>
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
