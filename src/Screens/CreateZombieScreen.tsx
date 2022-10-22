import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useCallback, useState } from 'react';
import {
    CustomSafeArea,
    CustomScrollView,
    CustomStatusBar,
    CustomText,
    CustomView,
    Loader,
} from '~Components';
import { ZombieContract } from '~Web3';

export const CreateZombieScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [zombieName, onChangeTextZombie] = useState('');
    const [kittyName, onChangeTextKitty] = useState('');
    const [_zombieId, onChangeTextZombieId] = useState('');
    const [isMintingZombie, setIsMintingZombie] = useState(false);
    const [isEatingKitty, setisEatingKitty] = useState(false);

    const createZombie = useCallback(async () => {
        try {
            setIsLoading(true);
            setIsMintingZombie(true);
            await ZombieContract.createRandomZombie(zombieName);
            setIsLoading(false);

            ZombieContract.once('NewZombie', (zombieId, name, dna) => {
                setIsMintingZombie(false);
                console.log({
                    zombieId: zombieId.toString(),
                    name,
                    dna: dna.toString(),
                });
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsMintingZombie(false);
        }
    }, [zombieName]);

    const eatTheKitty = useCallback(async () => {
        try {
            setIsLoading(true);
            setisEatingKitty(true);
            let zombieIdToNumber = +_zombieId;
            await ZombieContract.feedOnKitty(zombieIdToNumber, kittyName);
            setIsLoading(false);

            ZombieContract.once('NewZombie', (zombieId, name, dna) => {
                setisEatingKitty(false);
                console.log({
                    zombieId: zombieId.toString(),
                    name,
                    dna: dna.toString(),
                });
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setisEatingKitty(false);
        }
    }, [kittyName, _zombieId]);

    return (
        <CustomScrollView flexGrow>
            <CustomStatusBar />
            <CustomSafeArea />

            <CustomText font="title">Zombie Garage</CustomText>

            <CustomView mg={[40, 0, 0, 0]}>
                <CustomText font="body">Name your Zombie</CustomText>
                <TextInput
                    style={s.input}
                    onChangeText={onChangeTextZombie}
                    value={zombieName}
                    placeholder="Insert Zombie name"
                />
                <TouchableOpacity onPress={createZombie} style={s.button2}>
                    <CustomText font="body" color="white">
                        Create Zombie
                    </CustomText>
                </TouchableOpacity>

                {isMintingZombie && (
                    <CustomText font="caption" color="red">
                        Your Zombie is being minted
                    </CustomText>
                )}
            </CustomView>

            <CustomView mg={[40, 0, 0, 0]}>
                <CustomText font="body">Feed on a CryptoKitty</CustomText>

                <CustomView orientation="row">
                    <TextInput
                        style={[s.input, s.inputRow]}
                        onChangeText={onChangeTextZombieId}
                        value={_zombieId}
                        placeholder="Insert zombie id"
                        keyboardType="number-pad"
                    />
                    <TextInput
                        style={[s.input, s.inputRow]}
                        onChangeText={onChangeTextKitty}
                        value={kittyName}
                        placeholder="Insert Kitty name"
                    />
                </CustomView>

                <TouchableOpacity
                    onPress={eatTheKitty}
                    style={[s.button2, s.pinkBG]}>
                    <CustomText font="body" color="white">
                        Eat the Kitty
                    </CustomText>
                </TouchableOpacity>

                {isEatingKitty && (
                    <CustomText font="caption" color="red">
                        Your Zombie is eating a Kitty
                    </CustomText>
                )}
            </CustomView>

            {isLoading && (
                <Loader>
                    <CustomView align="center" mg={[140, 20, 0, 20]}>
                        <CustomText font="title" mg={[0, 0, 20, 0]}>
                            Loading
                        </CustomText>

                        <CustomText font="body" align="center">
                            Preparing a zombie. Be patient please 🥹
                        </CustomText>
                    </CustomView>
                </Loader>
            )}
        </CustomScrollView>
    );
};

const s = StyleSheet.create({
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
    pinkBG: { backgroundColor: '#ff83d3' },
    inputRow: { width: '40%', marginHorizontal: 10 },
});
