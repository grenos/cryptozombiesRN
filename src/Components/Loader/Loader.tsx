import { StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import { BlurView } from '~Components/BlurView/BlurView';

export const Loader = ({ children }: { children?: ReactNode }) => {
    return (
        <View style={s.container}>
            <BlurView />
            {children}
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        top: 0,
        bottom: 0,
    },
});
