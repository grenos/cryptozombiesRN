import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useTheme } from '~Utils';

export const CustomScrollView = (props: ScrollViewProps) => {
    const { style, ...otherProps } = props;
    const theme = useTheme();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={[{ backgroundColor: theme.background }, style]}
            {...otherProps}
        />
    );
};
