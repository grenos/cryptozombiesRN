/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
    CustomSafeArea,
    CustomStatusBar,
    CustomText,
    CustomView,
    Loader,
} from '~Components';
import { ethersProvider, WalletGlobal } from '../../index';
import { ethers, Wallet } from 'ethers';
import { ChainLinkToken, ZombieContract } from '~Web3';
import { useIsFocused } from '@react-navigation/native';

export const HomeScreen = () => {
    const focus = useIsFocused();
    const [funds, setFunds] = useState('');
    const [fundsLink, setFundsLink] = useState('');
    const [contractLinkBalance, setContractLinkBalance] = useState('');
    const [address, setAddress] = useState('');
    const [seed, setSeed] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
    const [_balanceOf, setBalanceOf] = useState(0);
    const [MyWallet, setMyWallet] = useState<Wallet | null>(null);

    useEffect(() => {
        const init = async () => {
            if (MyWallet && !firstTime) {
                console.log('enters');

                try {
                    const balance = await ethersProvider.getBalance(
                        MyWallet.address,
                    );
                    setFunds(
                        ethers.utils.formatEther(
                            ethers.BigNumber.from(balance),
                        ),
                    );

                    const link = await ChainLinkToken.balanceOf(
                        MyWallet.address,
                    );
                    setFundsLink(
                        ethers.utils.formatEther(ethers.BigNumber.from(link)),
                    );

                    const contractBalance = await ChainLinkToken.balanceOf(
                        ZombieContract.address,
                    );

                    setContractLinkBalance(
                        ethers.utils.formatEther(
                            ethers.BigNumber.from(contractBalance),
                        ),
                    );

                    const numberOfZombies = await ZombieContract.balanceOf(
                        MyWallet.address,
                    );
                    setBalanceOf(numberOfZombies.toString());
                } catch (error) {
                    console.log(error, 'FOCUS');
                }
            }
        };

        init();
    }, [MyWallet, firstTime, focus]);

    const createWallet = useCallback(async () => {
        try {
            const _wallet = ethers.Wallet.fromMnemonic(
                'rely spot column badge lunch forest question about ketchup produce misery angry',
            );
            setMyWallet(_wallet);
            const connectedWallet = _wallet.connect(ethersProvider);
            const _ = new WalletGlobal(connectedWallet);
            const balance = await ethersProvider.getBalance(
                connectedWallet.address,
            );
            setFunds(ethers.utils.formatEther(ethers.BigNumber.from(balance)));
            setAddress(connectedWallet.address);

            const numberOfZombies = await ZombieContract.balanceOf(
                connectedWallet.address,
            );
            setBalanceOf(numberOfZombies.toString());

            setSeed(connectedWallet.mnemonic.phrase);
            await setupChainlink(connectedWallet);
            setFirstTime(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, []);

    const setupChainlink = async (connectedWallet: Wallet) => {
        try {
            const _ChainLinkContract = ChainLinkToken.connect(connectedWallet);
            const link = await _ChainLinkContract.balanceOf(
                connectedWallet.address,
            );
            setFundsLink(ethers.utils.formatEther(ethers.BigNumber.from(link)));
            let parsedLink = parseInt(
                ethers.utils.formatEther(ethers.BigNumber.from(link)),
                10,
            );

            if (parsedLink > 6) {
                console.log('USER PAYED LINK TO CONTRACT');

                await _ChainLinkContract.transfer(
                    ZombieContract.address,
                    ethers.utils.parseUnits('6'),
                );

                const filterFrom = _ChainLinkContract.filters.Transfer(
                    connectedWallet.address,
                );

                _ChainLinkContract.on(
                    filterFrom,
                    async (from, to, amount, event) => {
                        // The `from` will always be the signer address
                        const contractBalance =
                            await _ChainLinkContract.balanceOf(
                                ZombieContract.address,
                            );

                        const _link = await _ChainLinkContract.balanceOf(
                            connectedWallet.address,
                        );
                        setFundsLink(
                            ethers.utils.formatEther(
                                ethers.BigNumber.from(_link),
                            ),
                        );

                        setContractLinkBalance(
                            ethers.utils.formatEther(
                                ethers.BigNumber.from(contractBalance),
                            ),
                        );
                    },
                );
            } else {
                console.log('USER DOESNT HAVE ANY LINK');
                const contractBalance = await _ChainLinkContract.balanceOf(
                    ZombieContract.address,
                );
                setFundsLink(
                    ethers.utils.formatEther(ethers.BigNumber.from(link)),
                );

                setContractLinkBalance(
                    ethers.utils.formatEther(
                        ethers.BigNumber.from(contractBalance),
                    ),
                );
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <CustomView container flex justify="flex-start">
            <CustomStatusBar />
            <CustomSafeArea />

            <CustomText font="title">My Wallet</CustomText>
            <CustomText font="caption">Goerli</CustomText>

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

                <CustomView align="flex-start" mg={[0, 0, 20, 0]}>
                    <CustomText font="body" bold>
                        My Link
                    </CustomText>
                    <CustomText font="body">{fundsLink}</CustomText>
                </CustomView>

                <CustomView align="flex-start" mg={[0, 0, 20, 0]}>
                    <CustomText font="body" bold>
                        Amount of Link in Zombie Contract
                    </CustomText>
                    <CustomText font="body">{contractLinkBalance}</CustomText>
                </CustomView>

                <CustomView align="flex-start" mg={[0, 0, 20, 0]}>
                    <CustomText font="body" bold>
                        Number of Zombies
                    </CustomText>
                    <CustomText font="body">{_balanceOf}</CustomText>
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
