import React from 'react';
import { ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '~Utils';

export const CustomSafeArea = (props: ViewProps) => {
    const { style, ...otherProps } = props;
    const theme = useTheme();

    return (
        <SafeAreaView
            style={[{ backgroundColor: theme.background }, style]}
            {...otherProps}
        />
    );
};
