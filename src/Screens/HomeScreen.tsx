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

export const HomeScreen = () => {
    const bottom = useBottomTabBarHeight();

    const [show, setShow] = useState(false);
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
                onPress={() => setShow(true)}
                testID="toucheMeButton">
                <CustomText font="body"> Touch me!</CustomText>
            </TouchableOpacity>

            {show && <CustomText font="body">IM HERE</CustomText>}
        </CustomView>
    );
};
