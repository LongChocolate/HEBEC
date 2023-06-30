import React, {useState} from 'react';
import {
    TextInput,
    View,
    TextInputProps,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    KeyboardTypeOptions,
    Platform,
    TextStyle,
} from 'react-native';
import {colors, sizes} from '@/styles/theme';
import Typography from '../Text/Typography';
import {ShowPassSvg} from '@/assets/svg/ShowPassSvg';
import {RowView} from '../View/RowView';
import {SearchSvg} from '@/assets/svg/SearchSvg';

interface inputProps extends TextInputProps {
    inputRef?: React.LegacyRef<TextInput>;
    label?: string;
    errorMessage?: string;
    inputStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    errorStyle?: TextStyle;
    showRequire?: boolean;
    componentRight?: React.ReactNode;
    componentLeft?: React.ReactNode;
    search?: boolean;
}

export const ElInput = React.forwardRef(
    (
        {
            inputRef,
            label,
            errorMessage,
            showRequire, //* required
            componentRight,
            componentLeft,
            containerStyle,
            inputStyle,
            labelStyle,
            errorStyle,
            search,
            ...props
        }: inputProps,
        ref,
    ) => {
        const [showPasss, setShowPass] = useState(props.secureTextEntry);

        const onPressShow = () => {
            setShowPass(!showPasss);
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
                        paddingVertical: Platform.OS === 'ios' ? 8 : 0,
                        paddingHorizontal: 16,
                        backgroundColor: '#fff',
                        borderWidth: !props.editable ? 0 : 1,
                        borderColor: errorMessage
                            ? colors.error
                            : props.value == ''
                            ? colors.mediumGrey
                            : colors.darkGrey,
                        borderRadius: 7,
                        height: !props.multiline ? 50 : null,
                        ...inputStyle,
                    }}>
                    {componentLeft}

                    <TextInput
                        numberOfLines={1}
                        placeholderTextColor={colors.grey}
                        allowFontScaling={false}
                        {...props}
                        ref={inputRef}
                        secureTextEntry={showPasss}
                        style={[
                            {
                                fontFamily: 'text-regular',
                                color: colors.darkGrey,
                                fontSize: sizes.size16,
                                flex: 1,
                                marginLeft: componentLeft && 10,
                                marginRight: componentRight && 10,
                                height: 70,
                            },
                            props.style,
                        ]}
                    />

                    {componentRight}

                    {props.secureTextEntry && (
                        <TouchableOpacity onPress={onPressShow}>
                            <ShowPassSvg showPass={showPasss} />
                        </TouchableOpacity>
                    )}

                    {search && <SearchSvg size={24} />}
                </RowView>
                {!!errorMessage && (
                    <Typography size14 error italic lineHeight={16} style={{marginTop: 3, ...errorStyle}}>
                        {errorMessage}
                    </Typography>
                )}
            </View>
        );
    },
);

ElInput.defaultProps = {
    editable: true,
};
