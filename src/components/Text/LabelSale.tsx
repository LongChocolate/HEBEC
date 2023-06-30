import React from 'react';
import {View, Text} from 'react-native';
import Typography from './Typography';
import {colors} from '@/styles/theme';

export const LabelSale = ({title, containerStyle}) => {
    return (
        <View style={containerStyle}>
            <Typography white center lineHeight={18} size12>
                {title}
            </Typography>
        </View>
    );
};
