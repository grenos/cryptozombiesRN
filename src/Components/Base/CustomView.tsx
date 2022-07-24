/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '~Utils';

type Props = {
    w?: number;
    pv?: number;
    ph?: number;
    mh?: number;
    mv?: number;
    bg?: string;
    dir?: 'row' | 'column';
} & ViewProps;

export const CustomView = (props: Props) => {
    const { style, ...otherProps } = props;
    const theme = useTheme();

    return (
        <View
            style={[
                {
                    backgroundColor: props.bg ? props.bg : theme.background,
                    width: props.w ? `${props.w}%` : '100%',
                    paddingVertical: props.pv ? props.pv : 0,
                    paddingHorizontal: props.ph ? props.ph : 0,
                    marginHorizontal: props.mh ? props.mh : 0,
                    marginVertical: props.mv ? props.mv : 0,
                    flexDirection: props.dir ? props.dir : 'column',
                },
                style,
            ]}
            {...otherProps}
        />
    );
};
