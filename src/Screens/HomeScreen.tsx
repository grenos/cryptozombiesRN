import React, { useEffect, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    CustomIcon,
    CustomSafeArea,
    CustomStatusBar,
    CustomText,
    CustomView,
} from '~Components';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch } from '~Storage/Redux';
// import { createTodo, getTodo, getTodos } from '~Storage/Redux/Actions';
// import { selectTodo, selectTodos } from '~Storage/Redux/Selectors';
import { Constants } from '~Utils';
import { ethers } from 'ethers';
import { ethersProvider } from '../../index';

export const HomeScreen = () => {
    const bottom = useBottomTabBarHeight();

    const [show, setShow] = useState(false);
    const [address, setAddress] = useState('');
    const dispatch = useAppDispatch();

    // const todo = useAppSelector(selectTodo);
    // const todos = useAppSelector(selectTodos);

    // console.log('todo--------', todo);
    // console.log('todos', todos);

    useEffect(() => {
        // dispatch(getTodo('todos/999'));
        // dispatch(
        //     createTodo({
        //         endpoint: 'todos',
        //         todo: {
        //             completed: false,
        //             id: 999,
        //             title: 'delectus aut autem',
        //             userId: 999,
        //         },
        //     }),
        // );
        // dispatch(getTodos('todos'));
    }, [dispatch, show]);

    const createWallet = () => {
        const wallet = ethers.Wallet.createRandom();
        console.log('mnemonic', wallet.mnemonic);
        console.log('mnemonic', wallet.address);
        setAddress(wallet.address);
    };

    const getFunds = async () => {
        const balance = await ethersProvider.getBalance(
            '0xC9CF5E3B476Cdc95340c4a1b6696B5c1FAe3059A',
        );

        console.log(
            'balance in ETH',
            ethers.utils.formatEther(ethers.BigNumber.from(balance)),
        );
    };

    return (
        <CustomView
            style={{ paddingBottom: bottom }}
            background="pink"
            mg={[10, 20, 10, 20]}>
            <CustomStatusBar translucent />
            <CustomSafeArea />

            <CustomText mg={[0, 20, 20, 20]} font="title">
                Step One
            </CustomText>

            <CustomIcon
                size={32}
                name={Constants.close}
                pressable
                action={() => console.log('Test')}
            />

            <TouchableOpacity
                onPress={() => {
                    setShow(true);
                    createWallet();
                }}
                testID="toucheMeButton">
                <CustomText font="body"> Touch me!</CustomText>
            </TouchableOpacity>

            <TouchableOpacity onPress={getFunds} testID="toucheMeButton">
                <CustomText font="body"> GET FUNDS</CustomText>
            </TouchableOpacity>

            {show && <CustomText font="body">IM HERE</CustomText>}
        </CustomView>
    );
};
