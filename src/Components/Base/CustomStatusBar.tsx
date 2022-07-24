import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useTheme } from '~Utils';

type Props = {
    hero?: boolean;
    transparent?: boolean;
} & StatusBarProps;

export const CustomStatusBar = (props: Props) => {
    const theme = useTheme();
    const barStyle = props.hero
        ? 'light-content'
        : theme.isDark
        ? 'dark-content'
        : 'light-content';

    return (
        <StatusBar
            translucent={props.hero && true}
            barStyle={barStyle}
            backgroundColor={
                props.transparent
                    ? theme.constants.transparent
                    : theme.background
            }
            {...props}
        />
    );
};
