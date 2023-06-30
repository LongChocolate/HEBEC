import {BackSvg} from '@/assets/svg/BackSvg';
import {FilterSvg} from '@/assets/svg/FilterSvg';
import {ShopSvg} from '@/assets/svg/ShopSvg';
import {ButtonCustom} from '@/components/Button/Button';
import Typography from '@/components/Text/Typography';
import {RowView} from '@/components/View/RowView';
import {cartStore} from '@/store/CartStore';
import {SCREEN_WIDTH} from '@/styles/dimensions';
import {colors} from '@/styles/theme';
import React, {ReactNode} from 'react';
import {useNavigation} from '@react-navigation/native';

import {TouchableOpacityProps, View} from 'react-native';
import {NavigationScreens} from '@/utils/enum';
import {observer} from 'mobx-react';
import {userStore} from '@/store/UserStore';

interface HeaderProps extends TouchableOpacityProps {
    onClickLeft?: () => void;
    onClickRight?: () => void;
    title?: string;
    filter?: boolean;
    cart?: boolean;
    back?: boolean;
    children?: ReactNode;
}

export const Header = observer(
    ({onClickLeft, onClickRight, children, filter, cart, back, title, ...props}: HeaderProps) => {
        const {navigate} = useNavigation();

        return (
            <RowView
                style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: 20,
                    height: 70,
                    width: SCREEN_WIDTH,
                    justifyContent: title ? 'space-around' : 'space-between',
                }}>
                {title || back ? (
                    <View style={{width: 24}}>
                        {back && (
                            <ButtonCustom onPress={onClickLeft}>
                                <BackSvg size={24} color={colors.white} />
                            </ButtonCustom>
                        )}
                    </View>
                ) : (
                    <></>
                )}

                <View style={{width: children ? SCREEN_WIDTH - 98 : SCREEN_WIDTH - 88}}>
                    {title && (
                        <Typography white size18 lineHeight={24} bold center>
                            {title}
                        </Typography>
                    )}
                    {children && children}
                </View>
                <View style={{width: 24, alignItems: 'center'}}>
                    {filter && (
                        <ButtonCustom onPress={onClickRight}>
                            <FilterSvg />
                        </ButtonCustom>
                    )}
                    {cart && (
                        <>
                            <ButtonCustom onPress={() => navigate(NavigationScreens.CartOrderBook)}>
                                <ShopSvg />
                            </ButtonCustom>
                            {userStore.getLogin ? (
                                cartStore.getCountAll !== 0 && (
                                    <View
                                        style={{
                                            width: 10,
                                            height: 10,
                                            position: 'absolute',
                                            left: 15,
                                            top:10,
                                            borderRadius: 20,
                                            backgroundColor: colors.primary,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Typography
                                            white
                                            bold
                                            size={7}
                                            center
                                            lineHeight={10}
                                            style={{
                                                backgroundColor: colors.error,
                                                width: 12,
                                                height: 12,
                                                borderRadius: 20,
                                            }}
                                            allowFontScaling={true}>
                                            {cartStore.getCountAll > 9 ? '9+' : cartStore.getCountAll}
                                        </Typography>
                                    </View>
                                )
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </View>
            </RowView>
        );
    },
);
