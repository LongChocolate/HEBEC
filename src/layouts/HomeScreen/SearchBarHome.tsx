import React, {memo} from 'react';

import {colors} from '@/styles/theme';
import {RowView} from '@/components/View/RowView';
import {Dimensions, StyleSheet, TextInputProps, ViewStyle} from 'react-native';
import SearchBar from '@/components/Input/SearchBar';
import {ShopSvg} from '@/assets/svg/ShopSvg';
import {FilterSvg} from '@/assets/svg/FilterSvg';
import {ButtonCustom} from '@/components/Button/Button';
import {SCREEN_WIDTH} from '@/styles/dimensions';

interface SearchProps extends TextInputProps {
    focusSearch?: boolean;
    search?: boolean;
    containerInputSearch?: ViewStyle;
}

const SearchBarHome = ({search, focusSearch, containerInputSearch, ...props}: SearchProps) => {
    return (
        <SearchBar
            containerStyle={{
                width: '100%',
            }}
            containerInputSearch={containerInputSearch}
            {...props}
        />
    );
};

export default memo(SearchBarHome);
