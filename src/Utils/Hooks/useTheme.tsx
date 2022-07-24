import { ViewStyle } from 'react-native';
import { useColorScheme } from './useColorScheme';

type Theme = {
    isDark: boolean;
    background: string;
    text: string;
    tabicon: string;
    tabiconInactive: string;
    constants: {
        dark: string;
        light: string;
        gray: string;
        transparent: string;
        centered: {
            justifyContent: ViewStyle['justifyContent'];
            alignItems: ViewStyle['alignItems'];
        };
        title: number;
        subTitle: number;
        body: number;
        caption: number;
        heart: string;
    };
};

const constants = {
    dark: '#000000',
    light: '#ffffff',
    gray: 'gray',
    transparent: 'transparent',
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: 32,
    subTitle: 24,
    body: 18,
    caption: 12,
    heart: '#ff0000',
};

const Theme = {
    dark: {
        isDark: false,
        background: 'black',
        text: 'white',
        tabicon: '#b1b1b1',
        tabiconInactive: '#595959',
    },
    light: {
        isDark: true,
        background: 'white',
        text: 'black',
        tabicon: 'black',
    },
};

export const useTheme = () => {
    const colorScheme = useColorScheme();
    const theme = Theme[colorScheme];
    return { ...theme, constants } as Theme;
};
