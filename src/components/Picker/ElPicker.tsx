import React, {useState} from 'react';
import {View, Text, ViewStyle, TextStyle, NativeSyntheticEvent, TargetedEvent} from 'react-native';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import {colors} from '@/styles/theme';
import Typography from '../Text/Typography';
import {RowView} from '../View/RowView';

interface Props {
    items: Item[];
    value?: any;
    onPicker: (value: any) => void;
    placeholder?: string;
    defaultValue?: string;
    label?: string;
    errorMessage?: string;
    inputStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    errorStyle?: TextStyle;
    showRequire?: boolean;
    componentRight?: React.ReactNode;
    componentLeft?: React.ReactNode;
    editable?: boolean;
    onBlur?: () => void;
}

export const ElPicker = ({
    items,
    value,
    placeholder,
    defaultValue = null,
    label,
    errorMessage,
    showRequire,
    componentRight,
    componentLeft,
    containerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
    editable = true,
    onPicker,
    onBlur,
}: Props) => {
    const [newValue, setNewValue] = useState(value);

    const onValueChange = (value, index) => {
        onPicker(value);
        setNewValue(value);
    };

    return (
        <View style={{...containerStyle}}>
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

            <RowView
                style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    backgroundColor: '#fff',
                    borderWidth: !editable ? 0 : 1,
                    borderColor: errorMessage ? colors.error : newValue == '' ? colors.mediumGrey : colors.darkGrey,
                    borderRadius: 7,
                    height: 50,
                    maxHeight: 50,
                    ...inputStyle,
                }}>
                {componentLeft}

                <RNPickerSelect
                    useNativeAndroidPickerStyle={true}
                    onValueChange={onValueChange}
                    items={items}
                    value={newValue}
                    onClose={onBlur}
                    placeholder={{
                        label: placeholder,
                        value: defaultValue,
                    }}
                    style={{
                        viewContainer: {
                            flex: 1,
                            justifyContent: 'center',
                            // marginVertical: -10,
                            marginLeft: componentLeft && 10,
                            marginRight: componentRight && 10,
                        },
                        placeholder: {
                            color: colors.grey,
                        },
                        inputIOS: {
                            fontFamily: 'text-regular',
                            color: colors.darkGrey,
                            fontSize: 16,
                        },
                        inputAndroid: {
                            fontFamily: 'text-regular',
                            color: colors.darkGrey,
                            fontSize: 16,
                        },
                    }}
                />

                {componentRight}
            </RowView>
            {!!errorMessage && (
                <Typography size14 error italic lineHeight={16} style={{marginTop: 3, ...errorStyle}}>
                    {errorMessage}
                </Typography>
            )}
        </View>
    );
};
