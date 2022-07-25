/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '~Utils';

type Props = {
    width?: number;
    background?: string;
    direction?: 'row' | 'column';
    justify?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around';
    align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    mg?: [number, number, number, number];
    pd?: [number, number, number, number];
} & ViewProps;

export const CustomView = (props: Props) => {
    const { style, ...otherProps } = props;
    const theme = useTheme();

    return (
        <View
            style={[
                {
                    flexDirection: props.direction ? props.direction : 'column',
                    justifyContent: props.justify ? props.justify : 'center',
                    alignItems: props.align ? props.align : 'center',
                    backgroundColor: props.background
                        ? props.background
                        : theme.constants.transparent,
                    width: props.width ? `${props.width}%` : undefined,
                    marginTop: props.mg && props.mg[0],
                    marginRight: props.mg && props.mg[1],
                    marginBottom: props.mg && props.mg[2],
                    marginLeft: props.mg && props.mg[3],
                    paddingTop: props.pd && props.pd[0],
                    paddingRight: props.pd && props.pd[1],
                    paddingBottom: props.pd && props.pd[2],
                    paddingLeft: props.pd && props.pd[3],
                },
                style,
            ]}
            {...otherProps}
        />
    );
};
