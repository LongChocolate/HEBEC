import React from 'react';
import {TouchableOpacityProps, View} from 'react-native';
import Typography from '../Text/Typography';
import {CardView} from '../Card/CardView';
import { transferDate } from '@/utils/helper';

interface ItemNewsProps extends TouchableOpacityProps {
    item: any;
    onPress?: () => {};
}

export const ItemNews = ({item, ...props}: ItemNewsProps) => {

    return (
        <CardView
            {...props}
            style={{marginBottom: 20}}
            onClick={true}
            icon={item.thumbnail}
            containerStyle={{
                height: 100,
                flexDirection: 'row',
                width: '100%',
                borderRadius: 7,
            }}
            imageStyle={{
                width: 130,
                height: 100,
                borderTopLeftRadius: 7,
                borderBottomLeftRadius: 7,
            }}>
            <View style={{padding: 15, width: '60%'}}>
                <Typography darkGrey size14 lineHeight={16} style={{height: 32}} ellipsizeMode="tail" numberOfLines={2}>
                    {item.title}
                </Typography>
                <Typography size12 mediumGrey>
                    {transferDate(item.createdAt)}
                </Typography>
            </View>
        </CardView>
    );
};
