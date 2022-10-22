/* eslint-disable react-native/no-inline-styles */
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '~Utils';

type Props = {
    width?: number;
    background?: string;
    orientation?: 'row' | 'column';
    justify?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around';
    align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    mg?: [number, number, number, number];
    pd?: [number, number, number, number];
    container?: boolean;
    flex?: boolean;
} & ViewProps;

export const CustomView = (props: Props) => {
    const { style, ...otherProps } = props;
    const theme = useTheme();
    const bottom = useBottomTabBarHeight();

    const getComputedPd = useMemo(() => {
        if (props.pd && !props.container) {
            return props.pd[2];
        }

        if (!props.pd && props.container) {
            return bottom;
        }

        if (props.pd && props.container) {
            return props.pd[2] + bottom;
        }

        return undefined;
    }, [bottom, props.container, props.pd]);

    return (
        <View
            style={[
                {
                    flex: props.flex ? 1 : 0,
                    flexDirection: props.orientation
                        ? props.orientation
                        : 'column',
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
                    paddingBottom: getComputedPd,
                    paddingLeft: props.pd && props.pd[3],
                },
                style,
            ]}
            {...otherProps}
        />
    );
};
