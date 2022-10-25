import {
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamListOther } from '~Navigation/Stacks';
import { CustomView, CustomText, Loader } from '~Components';
import { Wallet, ZombieContract } from '~Web3';
import { ethers } from 'ethers';

type Props = NativeStackScreenProps<RootStackParamListOther, 'ZombieDetail'>;

export const ZombieDetail: FC<Props> = ({ route, navigation }) => {
    const { zombie } = route.params;

    const [Level, setLevel] = useState(zombie.level);
    const [newName, setNewName] = useState('');
    const [address, setAddress] = useState(
        '0x3fc325406635161A4544380E63AF86c9B6669292',
    );
    const [isLoading, setIsLoading] = useState(false);

    const setNavName = useCallback(() => {
        navigation.setOptions({ headerTitle: zombie.name });
    }, [navigation, zombie.name]);

    useEffect(() => {
        setNavName();
    }, [setNavName]);

    const levelUp = async () => {
        try {
            await ZombieContract.levelUp(zombie.index, {
                value: ethers.utils.parseEther('0.001'),
            });
            setLevel(state => state + 1);
        } catch (error) {
            console.log(error);
        }
    };

    const changeName = async () => {
        try {
            await ZombieContract.changeName(zombie.index, newName);
        } catch (error) {
            console.log(error);
        }
    };

    const transferZombieFrom = async () => {
        setIsLoading(true);
        try {
            await ZombieContract.transferZombieFrom(
                Wallet.address,
                address,
                zombie.index,
            );

            ZombieContract.once(
                'Transfer',
                (form: string, to: string, tokenId: number) => {
                    setIsLoading(false);
                    console.log({
                        form,
                        to,
                        tokenId: tokenId.toString(),
                    });
                },
            );
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const formatDate = (_date: number) => {
        const now = new Date();
        var t = new Date(_date * 1000).toLocaleDateString('en-US');
        var s = new Date(_date * 1000).toLocaleTimeString('en-US');
        if (now > new Date(_date * 1000)) {
            return 'Yes';
        } else {
            return t + ' - ' + s;
        }
    };

    return (
        <>
            <CustomView
                flex
                container
                justify="flex-start"
                pd={[20, 20, 20, 20]}>
                <CustomView
                    align="flex-start"
                    justify="space-between"
                    style={s.innerContainer}>
                    <CustomText font="body">Name: {zombie.name}</CustomText>
                    <CustomText font="body">
                        Dna: {zombie.dna.toString()}
                    </CustomText>
                    <CustomText font="body">Level: {Level}</CustomText>
                    <CustomText font="body">
                        Is ready: {formatDate(zombie.readyTime)}
                    </CustomText>
                    <CustomText font="body">
                        Winds: {zombie.winCount}
                    </CustomText>
                    <CustomText font="body">
                        Losses: {zombie.lossCount}
                    </CustomText>
                </CustomView>

                <TouchableOpacity onPress={levelUp} style={[s.button2]}>
                    <CustomText font="body" color="white">
                        Level Up
                    </CustomText>
                </TouchableOpacity>

                <CustomView mg={[40, 0, 0, 0]}>
                    <CustomText font="body">Rename your Zombie</CustomText>
                    <TextInput
                        style={s.input}
                        onChangeText={setNewName}
                        value={newName}
                        placeholder="Insert Zombie name"
                    />
                    <TouchableOpacity onPress={changeName} style={s.button2}>
                        <CustomText font="body" color="white">
                            Change Name
                        </CustomText>
                    </TouchableOpacity>
                </CustomView>

                <CustomView mg={[40, 0, 0, 0]}>
                    <CustomText font="body">Transfer Zombie</CustomText>
                    <TextInput
                        style={[s.input, s.screenWidth]}
                        onChangeText={setAddress}
                        value={address}
                        placeholder="Insert address to transfer zombie"
                    />
                    <TouchableOpacity
                        onPress={transferZombieFrom}
                        style={s.button2}>
                        <CustomText font="body" color="white">
                            Transfer Zombie
                        </CustomText>
                    </TouchableOpacity>
                </CustomView>
            </CustomView>

            {isLoading && (
                <Loader>
                    <CustomView align="center" mg={[140, 20, 0, 20]}>
                        <CustomText font="title" mg={[0, 0, 20, 0]}>
                            Loading
                        </CustomText>

                        <CustomText font="body" align="center">
                            Your zombie is being transfered to {address}. Be
                            patient please 🥹
                        </CustomText>
                    </CustomView>
                </Loader>
            )}
        </>
    );
};

const s = StyleSheet.create({
    innerContainer: { height: 200, width: '100%' },
    button2: {
        backgroundColor: '#722391',
        marginTop: 20,
        width: 200,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 6,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        width: 200,
        padding: 10,
    },
    screenWidth: { width: Dimensions.get('window').width - 40 },
});
