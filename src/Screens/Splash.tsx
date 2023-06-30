import {DefaultAvatar} from '@/assets/svg/DefaultAvatar';
import {ImageView} from '@/components/Image/ImageDefault';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/styles/dimensions';
import React from 'react';
import {Image, View} from 'react-native';

export const Splash = () => {
    return (
        <View style={{flex: 1}}>
            <Image
                style={{flex: 1, width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
                source={require('../assets/splash.png')}
            />
        </View>
    );
};
