/* eslint-disable react-native/no-inline-styles */
import React, { FC, memo } from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '~Utils';

type Props = {
    size: number;
    name: string;
    pressable?: boolean;
    absolute?: boolean;
    t?: number;
    r?: number;
    b?: number;
    l?: number;
    z?: number;
    color?: string;
    action?: () => void;
} & ViewProps;

export const CustomIcon: FC<Props> = memo(
    ({
        size,
        name,
        pressable,
        action,
        style,
        absolute,
        t,
        r,
        b,
        l,
        z,
        color,
    }) => {
        const theme = useTheme();

        const onPress = () => {
            action && action!();
        };

        if (pressable) {
            return (
                <TouchableOpacity
                    onPress={onPress}
                    style={[
                        style,
                        {
                            position: absolute ? 'absolute' : 'relative',
                            top: t,
                            right: r,
                            left: l,
                            bottom: b,
                            zIndex: z,
                        },
                    ]}>
                    <Icon
                        name={name}
                        size={size}
                        color={color ? color : theme.text}
                    />
                </TouchableOpacity>
            );
        }

        return (
            <Icon
                name={name}
                size={size}
                color={color ? color : theme.text}
                style={[
                    style,
                    {
                        position: absolute ? 'absolute' : 'relative',
                        top: t,
                        right: r,
                        left: l,
                        bottom: b,
                        zIndex: z,
                    },
                ]}
            />
        );
    },
);
