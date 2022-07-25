import React, { FC } from 'react';
import { useTheme } from '~Utils';
import { CustomView } from './CustomView';

type Props = {
    height: number;
};

export const Spacer: FC<Props> = ({ height }) => {
    const theme = useTheme();
    return (
        <CustomView
            style={{ height: height }}
            background={theme.constants.transparent}
        />
    );
};
