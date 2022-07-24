import React, { FC, memo } from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '~Utils';

type Props = {
    size: number;
    name: string;
    pressable?: boolean;
    color?: string;
    action?: () => void;
} & ViewProps;

export const CustomIcon: FC<Props> = memo((props: Props) => {
    const { style, name, size, ...otherProps } = props;
    const theme = useTheme();

    const onPress = () => {
        props.action && props.action!();
    };

    if (props.pressable) {
        return (
            <TouchableOpacity onPress={onPress} style={style} {...otherProps}>
                <Icon
                    name={name}
                    size={size}
                    color={props.color ? props.color : theme.text}
                />
            </TouchableOpacity>
        );
    }

    return (
        <Icon
            name={name}
            size={size}
            color={props.color ? props.color : theme.text}
            style={style}
            {...otherProps}
        />
    );
});
