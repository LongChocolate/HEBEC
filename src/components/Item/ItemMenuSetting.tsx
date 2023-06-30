import React, {ReactNode, useState} from 'react';
import {TouchableOpacity, TouchableOpacityProps, StyleSheet, View} from 'react-native';
import Typography from '../Text/Typography';
import {RowView} from '../View/RowView';
import {AccessorySvg} from '@/assets/svg/AccessorySvg';
import {appStyle, colors} from '@/styles/theme';

interface ItemMenuProps extends TouchableOpacityProps {
    icon: ReactNode;
    title: string;
    access?: boolean;
    split?: boolean;
    primary?: boolean;
    chat?: boolean;
    onPress?: () => {};
}

export const ItemMenu = ({icon, title, access, split, primary, chat, ...props}: ItemMenuProps) => {
    return (
        <TouchableOpacity {...props} style={[styles.container, split && appStyle.borderBottom]}>
            <RowView justifyContent="space-between">
                <RowView>
                    {icon}
                    <Typography size16 lineHeight={18.75} style={styles.typographyStyle} primary={primary}>
                        {title}
                    </Typography>
                </RowView>
                {access && <AccessorySvg />}
                {chat && (
                    <View
                        style={{
                            backgroundColor: colors.error,
                            paddingVertical: 2,
                            paddingHorizontal: 15,
                            borderRadius: 15,
                        }}>
                        <Typography white bold size16>
                            2
                        </Typography>
                    </View>
                )}
            </RowView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'center',
    },
    typographyStyle: {paddingHorizontal: 10},
});
