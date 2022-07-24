import React from 'react';
import {
    TransitionPresets,
    createStackNavigator,
} from '@react-navigation/stack';
import { OtherScreen } from '~Screens';

export type RootStackParamListOther = {
    Other: undefined;
};

const Other = createStackNavigator<RootStackParamListOther>();

export const OtherStack = () => {
    return (
        <Other.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Other.Group>
                <Other.Screen
                    name="Other"
                    component={OtherScreen}
                    options={{ headerShown: false }}
                />
            </Other.Group>
        </Other.Navigator>
    );
};
