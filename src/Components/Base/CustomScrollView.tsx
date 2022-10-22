/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useTheme } from '~Utils';

type Props = {
    flexGrow?: boolean;
} & ScrollViewProps;

export const CustomScrollView: FC<Props> = props => {
    const { style, ...otherProps } = props;
    const theme = useTheme();

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: props.flexGrow ? 1 : 0 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={[{ backgroundColor: theme.background }, style]}
            {...otherProps}
        />
    );
};
