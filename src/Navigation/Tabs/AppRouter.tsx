import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreateZombiesStack, HomeStack, OtherStack } from '~Navigation/Stacks';
import { TabIcon, BlurView } from '~Components';
import { Constants, useTheme } from '~Utils';

const Tab = createBottomTabNavigator();

export const AppRouter = () => {
    const theme = useTheme();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.tabicon,
                tabBarInactiveTintColor: theme.tabiconInactive,
                tabBarStyle:
                    Platform.OS === 'android'
                        ? { backgroundColor: theme.constants.light }
                        : { position: 'absolute' },
                tabBarBackground: () =>
                    Platform.OS === 'android' ? undefined : <BlurView />,
            }}>
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarLabel: Constants.home,
                    tabBarIcon: ({ focused, size }) => (
                        <TabIcon
                            focused={focused}
                            size={size}
                            title={Constants.home}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CreateZombiesStack"
                component={CreateZombiesStack}
                options={{
                    tabBarLabel: Constants.create,
                    tabBarIcon: ({ focused, size }) => (
                        <TabIcon
                            focused={focused}
                            size={size}
                            title={Constants.create}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="OtherStack"
                component={OtherStack}
                options={{
                    tabBarLabel: Constants.other,
                    tabBarIcon: ({ focused, size }) => (
                        <TabIcon
                            focused={focused}
                            size={size}
                            title={Constants.other}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
