import 'react-native-gesture-handler';
import React, { useMemo } from 'react';
import { AppRegistry, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import App from './src/App';
import { name as appName } from './app.json';
import { realmContext } from '~Storage/Realm';
import { store } from '~Storage/Redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme, useTheme } from '~Utils';
const { RealmProvider } = realmContext;
import { ethers } from 'ethers';
import { INNFURA_API_KEY } from '@env';

export const ethersProvider = new ethers.providers.InfuraProvider(
    'sepolia',
    INNFURA_API_KEY,
);

LogBox.ignoreLogs(['The native module for Flipper', 'ViewPropTypes']);

const getTheme = (scheme, colorTheme) => {
    const theme = {
        colors: {
            background: scheme === 'dark' ? colorTheme.dark : colorTheme.light,
            border: scheme === 'dark' ? colorTheme.dark : colorTheme.light,
        },
    };
    return theme;
};

const Main = () => {
    const scheme = useColorScheme();
    const theme = useTheme();
    const colorScheme = useMemo(
        () => getTheme(scheme, theme.constants),
        [scheme, theme],
    );

    return (
        <Provider store={store}>
            <NavigationContainer theme={colorScheme}>
                <RealmProvider>
                    <SafeAreaProvider>
                        <App />
                    </SafeAreaProvider>
                </RealmProvider>
            </NavigationContainer>
        </Provider>
    );
};

AppRegistry.registerComponent(appName, () => Main);
