import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OtherScreen, ZombieDetail } from '~Screens';
import { Zombie } from '~Types';

export type RootStackParamListOther = {
    Other: undefined;
    ZombieDetail: { zombie: Zombie };
};

const Other = createStackNavigator<RootStackParamListOther>();

export const OtherStack = () => {
    return (
        <Other.Navigator>
            <Other.Group>
                <Other.Screen
                    name="Other"
                    component={OtherScreen}
                    options={{ headerShown: false }}
                />

                <Other.Screen name="ZombieDetail" component={ZombieDetail} />
            </Other.Group>
        </Other.Navigator>
    );
};
