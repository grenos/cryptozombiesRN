import React from 'react';
import {
    TransitionPresets,
    createStackNavigator,
} from '@react-navigation/stack';
import { HomeScreen } from '~Screens';

export type RootStackParamListHome = {
    Home: undefined;
};

const Home = createStackNavigator<RootStackParamListHome>();

export const HomeStack = () => {
    return (
        <Home.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Home.Group>
                <Home.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
            </Home.Group>
        </Home.Navigator>
    );
};
