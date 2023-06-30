import {colors, fonts} from '@/styles/theme';
import React, {ReactNode} from 'react';
import {Image, Platform, TextStyle, View, ViewStyle} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {SelectDropdownProps} from 'react-native-select-dropdown';
import Typography from '../Text/Typography';

interface dropProps extends SelectDropdownProps {
    label?: string;
    errorMessage?: string;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    errorStyle?: TextStyle;
    showRequire?: boolean;
    data: any;
    placeholder: string;
}

export const DropDown = ({
    label,
    showRequire,
    labelStyle,
    data,
    placeholder,
    containerStyle,
    errorMessage,
    errorStyle,
    ...props
}: dropProps) => {
    return (
        <View style={containerStyle}>
            {!!label && (
                <Typography size14 lineHeight={16} darkGrey style={{marginBottom: 5, ...labelStyle}}>
                    {label}
                    {showRequire && (
                        <Typography size14 lineHeight={16} error>
                            {' '}
                            * (bắt buộc)
                        </Typography>
                    )}
                </Typography>
            )}
            <View
                style={{
                    width: '100%',
                    paddingVertical: Platform.OS === 'ios' ? 8 : 0,
                    paddingHorizontal: 8,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: errorMessage ? colors.error : colors.darkGrey,
                    borderRadius: 7,
                }}>
                <SelectDropdown
                    data={data}
                    buttonStyle={{
                        backgroundColor: colors.white,
                        borderRadius: 7,
                        width: '100%',
                    }}
                    renderDropdownIcon={() => {
                        return (
                            <Image
                                source={require('../../assets/images/icArrowDown.png')}
                                style={{width: 10, height: 10}}
                            />
                        );
                    }}
                    defaultButtonText={placeholder}
                    buttonTextStyle={{textAlign: 'left', color: colors.darkGrey, ...fonts.size16}}
                    dropdownStyle={{backgroundColor: colors.white}}
                    {...props}
                />
            </View>
            {!!errorMessage && (
                <Typography size14 error italic lineHeight={16} style={{marginTop: 3, ...errorStyle}}>
                    {errorMessage}
                </Typography>
            )}
        </View>
    );
};
