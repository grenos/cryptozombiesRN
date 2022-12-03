/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
    CustomSafeArea,
    CustomStatusBar,
    CustomText,
    CustomView,
    Loader,
} from '~Components';
import { ethersProvider, WalletGlobal } from '../../index';
import { BigNumber, ethers, Wallet } from 'ethers';
import { ChainLinkToken, getTokenBalance, ZombieContract } from '~Web3';
import { useIsFocused } from '@react-navigation/native';

import { NativeModules, NativeEventEmitter } from 'react-native';
import { useTokens } from '~Utils/Hooks/useTokens';
const { Tokens } = NativeModules;
import { realmContext, RToken } from '~Storage/Realm';
const { useRealm, useQuery, useObject } = realmContext;
import { Tokens as JSONTokens } from '~Web3';
import { Token } from '~Types';
import { ERC20 } from '~Web3/Abi';

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

    // useTokens('0x4b58C57db696D2E043a72149507d5267f7dD74fe');
    const realm = useRealm();
    const Realmtokens = useQuery('RToken');
    // console.log(Realmtokens);
    useMemo(() => console.log('memo busted', Realmtokens[0]), [Realmtokens]);

    const [count, setCount] = useState(0);

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
                'woman slush laugh wink lonely dose deny piece actress banana giraffe confirm',
            );
            const connectedWallet = _wallet.connect(ethersProvider);
            setMyWallet(connectedWallet);
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

    useEffect(() => {
        const TokenEvents = new NativeEventEmitter(Tokens);
        TokenEvents.addListener('onTokensBalances', res => {
            console.log('onTokensBalances event', res);
        });

        return () => {
            TokenEvents.removeAllListeners('onTokensBalances');
        };
    }, []);

    const getBalances = useCallback(async () => {
        const _tokens = [
            '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
            '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
            '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
            '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
        ];
        const _address = '0x4b58C57db696D2E043a72149507d5267f7dD74fe';
        Tokens.get(_tokens, _address);
    }, []);

    const fetchTokens = () => {
        JSONTokens.forEach(async (token: Token) => {
            const _token = new ethers.Contract(token.address, ERC20, MyWallet!);
            const balance = await _token.balanceOf(
                '0x4b58C57db696D2E043a72149507d5267f7dD74fe',
            );

            if (BigNumber.from(balance).gt(0)) {
                realm.write(() => {
                    realm.create(
                        RToken.schema.name,
                        {
                            ...token,
                            balance: balance.toString(),
                        },
                        'modified',
                    );
                });
            }
        });
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

            <TouchableOpacity onPress={fetchTokens} style={s.button}>
                <CustomText font="body" color="white">
                    Get balances
                </CustomText>
            </TouchableOpacity>

            <CustomView align="flex-start" mg={[40, 20, 0, 20]}>
                <CustomView align="flex-start" mg={[0, 0, 20, 0]}>
                    <CustomText font="body" bold>
                        My Address
                    </CustomText>
                    <CustomText font="body">{address}</CustomText>
                </CustomView>

                <TouchableOpacity onPress={e => setCount(c => c + 1)}>
                    <CustomText font="body">Increment</CustomText>
                </TouchableOpacity>

                {/* <CustomView align="flex-start" mg={[0, 0, 20, 0]}>
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
                </CustomView> */}

                <ActivityIndicator size="large" />
            </CustomView>

            {/* {isLoading && (
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
            )} */}
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
