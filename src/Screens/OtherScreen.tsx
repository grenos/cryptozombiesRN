import React from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    CustomSafeArea,
    CustomStatusBar,
    CustomText,
    CustomView,
} from '~Components';

export const OtherScreen = () => {
    const bottom = useBottomTabBarHeight();

    return (
        <>
            <CustomStatusBar translucent />
            <CustomSafeArea />
            <CustomView style={{ paddingBottom: bottom }}>
                <CustomText font="title">OtherScreen</CustomText>
            </CustomView>
        </>
    );
};
