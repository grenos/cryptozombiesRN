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
import { getTodo } from '~Storage/Redux/Actions';
import { Constants } from '~Utils';

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

            <CustomText margin={[0, 20, 20, 20]} font="title">
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
