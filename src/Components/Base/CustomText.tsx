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
    margin?: number[];
    padding?: number[];
} & TextProps;

export const CustomText = (props: Props) => {
    const { style, ...otherProps } = props;
    const theme = useTheme();

    return (
        <CustomView
            style={{
                marginTop: props.margin && props.margin[0],
                marginRight: props.margin && props.margin[1],
                marginBottom: props.margin && props.margin[2],
                marginLeft: props.margin && props.margin[3],
                paddingTop: props.padding && props.padding[0],
                paddingRight: props.padding && props.padding[1],
                paddingBottom: props.padding && props.padding[2],
                paddingLeft: props.padding && props.padding[3],
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
