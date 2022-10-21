import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useCallback, useState } from 'react';
import {
    CustomSafeArea,
    CustomStatusBar,
    CustomText,
    CustomView,
    Loader,
} from '~Components';

export const CreateZombieScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [zombieName, onChangeText] = useState('');

    const createZombie = useCallback(() => {
        console.log(zombieName);
        setIsLoading(false);
        // const contract = new ethers.Contract(
        //     CONTRACT_ADDRESS,
        //     TestContract.abi,
        //     connectedWallet,
        // );
        // console.log(contract);
        // const response = await contract.getValue();
        // console.log(response.toString());
        // const resp1 = await contract.setValue(5);
        // console.log(resp1);
        // contract.once('ValueChange', value => {
        //     console.log('VALUE HAS CHAMGED TO : ' + value);
        // });
    }, [zombieName]);

    return (
        <CustomView container flex justify="flex-start">
            <CustomStatusBar />
            <CustomSafeArea />

            <CustomText font="title">Zombie Garage</CustomText>

            <CustomView mg={[40, 0, 0, 0]}>
                <CustomText font="body">Name your Zombie</CustomText>
                <TextInput
                    style={s.input}
                    onChangeText={onChangeText}
                    value={zombieName}
                />
                <TouchableOpacity onPress={createZombie} style={s.button2}>
                    <CustomText font="body" color="white">
                        Create Zombie
                    </CustomText>
                </TouchableOpacity>
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
        </CustomView>
    );
};

const s = StyleSheet.create({
    button2: {
        backgroundColor: '#722391',
        marginTop: 20,
        width: 200,
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 6,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        width: 200,
        padding: 10,
    },
});
