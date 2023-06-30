import {boxShadow} from '@/styles/boxShadow';
import React from 'react';
import {View, Text, ViewProps} from 'react-native';

interface ShadowCardProps extends ViewProps {
    children?: React.ReactNode;
    nonBorder?: boolean;
}

export const ShadowCard = ({children, nonBorder, ...props}: ShadowCardProps) => {
    return (
        <View
            style={[
                {
                    backgroundColor: '#fff',
                    borderRadius: 14,
                },
                !nonBorder && {...boxShadow('rgba(0, 0, 0, 0.7)', 2, 5, 7)},
                props.style,
            ]}>
            {children}
        </View>
    );
};
