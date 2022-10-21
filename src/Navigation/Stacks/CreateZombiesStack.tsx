import React from 'react';
import {
    TransitionPresets,
    createStackNavigator,
} from '@react-navigation/stack';
import { CreateZombieScreen } from '~Screens';

export type RootStackParamListCreate = {
    Create: undefined;
};

const Create = createStackNavigator<RootStackParamListCreate>();

export const CreateZombiesStack = () => {
    return (
        <Create.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Create.Group>
                <Create.Screen
                    name="Create"
                    component={CreateZombieScreen}
                    options={{ headerShown: false }}
                />
            </Create.Group>
        </Create.Navigator>
    );
};
