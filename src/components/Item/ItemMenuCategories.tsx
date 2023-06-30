import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    StyleSheet,
    View,
    Image,
    ImageProps,
    ViewStyle,
    TextStyle,
    ImageStyle,
} from 'react-native';
import Typography from '../Text/Typography';

interface ItemMenuProps extends TouchableOpacityProps {
    icon: any;
    title: string;
    containerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
    titleStyle?: TextStyle;
    onPress?: () => void;
}

export const ItemMenuCategories = ({icon, title, titleStyle, containerStyle, imageStyle, ...props}: ItemMenuProps) => {
    return (
        <TouchableOpacity {...props}>
            <View style={containerStyle}>
                <Image source={icon} style={imageStyle} />
                <Typography style={titleStyle} center>
                    {title}
                </Typography>
            </View>
        </TouchableOpacity>
    );
};
