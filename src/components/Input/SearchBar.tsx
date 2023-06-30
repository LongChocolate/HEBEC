import React, {memo, useRef, useState} from 'react';
import {StyleSheet, Dimensions, TextInput, TextInputProps, ViewStyle} from 'react-native';
import {ElInput} from './ElInput';

interface searchProps extends TextInputProps {
    containerInputSearch?: ViewStyle;
    containerStyle?: ViewStyle;
    placeholder?: string;
}

const SearchBar = ({containerStyle, containerInputSearch,placeholder, ...props}: searchProps) => {
    const searchRef = useRef();

    const [text, setText] = useState('');
    return (
        <ElInput
            inputRef={searchRef}
            placeholder={placeholder}
            search
            value={text}
            containerStyle={containerStyle}
            inputStyle={containerInputSearch}
            onChangeText={(value) => setText(value)}
            {...props}
            style={{fontSize: 16, lineHeight: 19}}
        />
    );
};

export default memo(SearchBar);
