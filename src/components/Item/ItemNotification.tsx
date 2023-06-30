import React from 'react';
import {TouchableOpacityProps, View} from 'react-native';
import Typography from '../Text/Typography';
import {CardView} from '../Card/CardView';
import {transferDate} from '@/utils/helper';
import {SealsSvg} from '@/assets/svg/SealsSvg';
import {colors} from '@/styles/theme';
import {observer} from 'mobx-react';

interface ItemNotificationProps extends TouchableOpacityProps {
    item: any;
    onPress?: () => {};
}

export const ItemNotification = observer(({item, ...props}: ItemNotificationProps) => {
    return (
        <CardView
            {...props}
            nonBorder
            defaultView={true}
            style={{marginBottom: 20}}
            onClick={true}
            containerStyle={{
                height: 100,
                flexDirection: 'row',
                width: '100%',
                borderRadius: 7,
                paddingVertical: 5,
            }}>
            <SealsSvg size={40} selected={!item.isSeen} />
            <View style={{paddingHorizontal: 15, width: '90%'}}>
                <Typography color={item.isSeen ? colors.mediumGrey : colors.darkGrey} size16 lineHeight={19} bold>
                    {item.title}
                </Typography>
                <Typography
                    color={item.isSeen ? colors.mediumGrey : colors.darkGrey}
                    size14
                    lineHeight={21}
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    style={{marginVertical: 5}}>
                    {item.content}
                </Typography>
                <Typography size12 mediumGrey>
                    {transferDate(item.createdAt)}
                </Typography>
            </View>
        </CardView>
    );
});
