import React, {useState} from 'react';
import {View, Image, ViewStyle} from 'react-native';
import {appStyle, colors} from '@/styles/theme';
import {BASE_URL} from '../../../config';

interface AvatarProps {
    containerStyle: ViewStyle;
    image?: string;
    size?: number;
    border?: boolean;
    mode?: string;
}

export const ImageView = ({image, size, border, containerStyle, mode}: AvatarProps) => {
    const [error, setError] = useState(false);
    return (
        <View style={containerStyle}>
            <Image
                source={error ? require('../../assets/icon.png') : {uri: BASE_URL + image}}
                style={{width: '100%', height: '100%', borderRadius: border ? 50 : 7}}
                defaultSource={require('../../assets/icon.png')}
                onError={() => setError(true)}
                resizeMode={mode}
            />
        </View>
    );
};
