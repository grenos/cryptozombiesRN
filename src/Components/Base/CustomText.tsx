/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '~Utils';

type Props = {
    bold?: boolean;
    font: 'title' | 'subTitle' | 'body' | 'caption';
    align?: 'left' | 'center' | 'right';
    italic?: boolean;
    color?: string;
} & TextProps;

export const CustomText = (props: Props) => {
    const { style, ...otherProps } = props;
    const theme = useTheme();

    return (
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
    );
};
