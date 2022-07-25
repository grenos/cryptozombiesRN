/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '~Utils';
import { CustomView } from './CustomView';

type Props = {
    bold?: boolean;
    font: 'title' | 'subTitle' | 'body' | 'caption';
    align?: 'left' | 'center' | 'right';
    italic?: boolean;
    color?: string;
    mg?: [number, number, number, number];
    pd?: [number, number, number, number];
} & TextProps;

export const CustomText = (props: Props) => {
    const { style, ...otherProps } = props;
    const theme = useTheme();

    return (
        <CustomView
            style={{
                marginTop: props.mg && props.mg[0],
                marginRight: props.mg && props.mg[1],
                marginBottom: props.mg && props.mg[2],
                marginLeft: props.mg && props.mg[3],
                paddingTop: props.pd && props.pd[0],
                paddingRight: props.pd && props.pd[1],
                paddingBottom: props.pd && props.pd[2],
                paddingLeft: props.pd && props.pd[3],
            }}>
            <Text
                style={[
                    {
                        color: props.color ? props.color : theme.text,
                        fontWeight: props.bold ? 'bold' : 'normal',
                        fontSize: theme.constants[props.font],
                        textAlign: props.align,
                        fontStyle: props.italic ? 'italic' : 'normal',
                    },
                    style,
                ]}
                {...otherProps}
            />
        </CustomView>
    );
};
