import {formatPrice, transferDate} from '@/utils/helper';
import React, {memo} from 'react';
import {View} from 'react-native';
import Typography from '../Text/Typography';
import {CardView} from '../Card/CardView';
import {StackActions, useNavigation} from '@react-navigation/native';
import {NavigationScreens} from '@/utils/enum';
import {LabelSale} from '../Text/LabelSale';
import {colors} from '@/styles/theme';
const ItemMenuProduct = ({item, containerStyle, cartStyle, imageStyle, ...props}) => {
    const navigation = useNavigation();
    return (
        <View style={containerStyle}>
            <CardView
                {...props}
                onClick={true}
                icon={item.thumbnail}
                containerStyle={cartStyle}
                imageStyle={imageStyle}
                mode={'center'}
                onPress={() => {
                    navigation.dispatch(StackActions.push(NavigationScreens.DetailProduct, {book: item}));
                }}>
                <View style={{paddingHorizontal: 10, paddingTop: 10, paddingBottom: 5}}>
                    <Typography
                        darkGrey
                        size14
                        lineHeight={16}
                        ellipsizeMode="tail"
                        numberOfLines={2}
                        style={{marginBottom: 5, height: 32}}>
                        {item.name}
                    </Typography>
                    <Typography size14 lineHeight={16} error bold style={{marginBottom: 5}}>
                        {formatPrice(item.finalPrice)}
                    </Typography>
                    <Typography size12 mediumGrey lineHeight={14} italic lineThough>
                        {formatPrice(item.originPrice)}
                    </Typography>
                </View>
            </CardView>
            {item.originPrice !== item.finalPrice && (
                <LabelSale
                    title={100 - (item.finalPrice / item.originPrice).toFixed(2) * 100 + ' %'}
                    containerStyle={{
                        position: 'absolute',
                        width: 80,
                        height: 20,
                        backgroundColor: colors.error,
                        right: -5,
                        top: 10,
                        transform: [{rotate: '45deg'}],
                    }}
                />
            )}
        </View>
    );
};

export default memo(ItemMenuProduct);
