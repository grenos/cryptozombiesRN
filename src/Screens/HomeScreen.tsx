import React, { useEffect, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    CustomSafeArea,
    CustomStatusBar,
    CustomText,
    CustomView,
} from '~Components';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch } from '~Storage/Redux';
import { getTodo } from '~Storage/Redux/Actions';

export const HomeScreen = () => {
    const bottom = useBottomTabBarHeight();

    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodo());
    }, [dispatch, show]);

    return (
        <CustomView style={{ paddingBottom: bottom }}>
            <CustomStatusBar translucent />
            <CustomSafeArea />

            <CustomText font="title">Step One</CustomText>

            <TouchableOpacity
                onPress={() => setShow(true)}
                testID="toucheMeButton">
                <CustomText font="body"> Touch me!</CustomText>
            </TouchableOpacity>

            {show && <CustomText font="body">IM HERE</CustomText>}
        </CustomView>
    );
};
