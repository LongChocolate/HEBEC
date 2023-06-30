import React from 'react';
import {View, Text} from 'react-native';
import {WaterMarkSvg} from '@/assets/svg/WaterMarkSvg';
import {colors} from '@/styles/theme';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '@/styles/dimensions';

export const WaterMarkBackView = () => {
    return (
        <View
            style={{
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: colors.white,
            }}>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    opacity: 0.7,
                }}>
                <WaterMarkSvg size={310} color={colors.lightGrey} />
            </View>
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    opacity: 0.7,
                    transform: [{rotate: '180deg'}],
                }}>
                <WaterMarkSvg size={207} color={colors.lightGrey} />
            </View>
        </View>
    );
};
