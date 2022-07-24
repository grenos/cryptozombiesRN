import React, { useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    CustomSafeArea,
    CustomStatusBar,
    CustomText,
    CustomView,
} from '~Components';
import { TouchableOpacity } from 'react-native';

export const HomeScreen = () => {
    const bottom = useBottomTabBarHeight();

    const [show, setShow] = useState(false);

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
