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
import { realmContext, RMovie } from '~Storage/Realm';
const { useQuery, useRealm, useObject } = realmContext;
import { TestContract } from '~Web3';
import { CONTRACT_ADDRESS, MNEMONIC } from '@env';

export const HomeScreen = () => {
    const bottom = useBottomTabBarHeight();

    const [show, setShow] = useState(false);
    const [, setAddress] = useState('');
    const dispatch = useAppDispatch();

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

    // const todo = useAppSelector(selectTodo);
    // const todos = useAppSelector(selectTodos);

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
        console.log('address', wallet.address);
        setAddress(wallet.address);
    };

    const getFunds = async () => {
        const balance1 = await ethersProvider.getBalance(
            '0x6e79183e94B92D59f52B96CDb2BB8DD638C2E537',
        );

        const balance2 = await ethersProvider.getBalance(
            '0x3fc325406635161A4544380E63AF86c9B6669292',
        );

        console.log(
            'balance in ETH for : 0x6e79183e94B92D59f52B96CDb2BB8DD638C2E537',
            ethers.utils.formatEther(ethers.BigNumber.from(balance1)),
        );

        console.log(
            'balance in ETH for : 0x3fc325406635161A4544380E63AF86c9B6669292',
            ethers.utils.formatEther(ethers.BigNumber.from(balance2)),
        );
    };

    useEffect(() => {
        const init = async () => {
            const wallet = ethers.Wallet.fromMnemonic(MNEMONIC);
            const connectedWallet = wallet.connect(ethersProvider);
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                TestContract.abi,
                connectedWallet,
            );
            console.log(contract);
            const response = await contract.getValue();
            console.log(response.toString());
            const resp1 = await contract.setValue(5);
            console.log(resp1);

            contract.once('ValueChange', value => {
                console.log('VALUE HAS CHAMGED TO : ' + value);
            });
        };

        // init();
    }, []);

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

            <CustomView mg={[30, 0, 0, 0]}>
                <TouchableOpacity onPress={getFunds} testID="toucheMeButton">
                    <CustomText font="body"> GET FUNDS</CustomText>
                </TouchableOpacity>
            </CustomView>

            <CustomView mg={[30, 0, 0, 0]}>
                <TouchableOpacity onPress={realmWrite} testID="toucheMeButton">
                    <CustomText font="body"> WRITE TO REALM</CustomText>
                </TouchableOpacity>
            </CustomView>

            <CustomView mg={[30, 0, 0, 0]}>
                <TouchableOpacity onPress={realmDelete} testID="toucheMeButton">
                    <CustomText font="body"> DELETE A REALM</CustomText>
                </TouchableOpacity>
            </CustomView>

            {show && <CustomText font="body">IM HERE</CustomText>}
        </CustomView>
    );
};
