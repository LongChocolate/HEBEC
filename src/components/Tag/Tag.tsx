import {CloseXSvg} from '@/assets/svg/CloseXSvg';
import {colors} from '@/styles/theme';
import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {ButtonCustom} from '../Button/Button';
import Typography from '../Text/Typography';

interface TagProps extends TouchableOpacityProps {
    title: string;
}
export const Tag = ({title, ...props}: TagProps) => {
    return (
        <ButtonCustom
            containerStyle={{
                backgroundColor: colors.primary,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 7,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
            }}
            {...props}>
            <Typography white size16 lineHeight={19} style={{marginRight: 10}}>
                {title}
            </Typography>
            <CloseXSvg color={colors.white} />
        </ButtonCustom>
    );
};
