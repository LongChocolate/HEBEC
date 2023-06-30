import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, Image, ViewStyle, ImageStyle, View} from 'react-native';
import {ImageView} from '../Image/ImageDefault';
import Typography from '../Text/Typography';
import {ShadowCard} from './ShadowCard';

interface ItemMenuProps extends TouchableOpacityProps {
    icon?: string;
    defaultView?: boolean;
    containerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
    onClick?: boolean;
    mode?: string;
    nonBorder?: boolean;
    onPress?: () => void;
}

export const CardView = ({
    containerStyle,
    imageStyle,
    icon,
    children,
    onClick,
    defaultView,
    mode,
    nonBorder,
    ...props
}: ItemMenuProps) => {
    return (
        <ShadowCard style={props.style} nonBorder={nonBorder}>
            {onClick ? (
                <TouchableOpacity {...props} style={containerStyle}>
                    {!defaultView && <ImageView image={icon} containerStyle={imageStyle} mode={mode} />}
                    {children}
                </TouchableOpacity>
            ) : (
                <View style={containerStyle}>
                    {!defaultView && <ImageView image={icon} containerStyle={imageStyle} mode={mode} />}
                    {children}
                </View>
            )}
        </ShadowCard>
    );
};
