import React from 'react';
import { StyleSheet } from 'react-native';
import { BlurView as BV } from '@react-native-community/blur';

export const BlurView = () => {
    return (
        <BV
            style={StyleSheet.absoluteFill}
            blurType="ultraThinMaterial"
            blurAmount={1}
        />
    );
};
