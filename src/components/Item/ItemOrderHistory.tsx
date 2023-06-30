import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import Typography from '../Text/Typography';
import {RowView} from '../View/RowView';
import {appStyle, colors} from '@/styles/theme';
import {BoxShippingSvg} from '@/assets/svg/BoxShippingSvg';
import {formatPrice, transferDate, transferOrderStatus} from '@/utils/helper';
import {historyStore} from '@/store/HistoryStore';
import { OrderStatus } from '@/utils/enum';
import { observer } from 'mobx-react';

interface ItemOrderHistoryProps extends TouchableOpacityProps {
    order: any;
    onPress?: () => {};
}

export const ItemOrderHistory = observer(({order, ...props}: ItemOrderHistoryProps) => {
    return (
        <TouchableOpacity {...props}>
            <RowView
                style={{
                    marginHorizontal: 20,
                    paddingVertical: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.grey,
                }}>
                <View style={{alignSelf: 'baseline'}}>
                    <BoxShippingSvg />
                </View>
                <View style={{marginHorizontal: 10, flex: 1}}>
                    <RowView justifyContent="space-between">
                        <Typography bold lineHeight={21} size18 darkGrey>
                            {order.code}
                        </Typography>
                        <Typography error size16 lineHeight={24} bold>
                            {formatPrice(order.moneyFinal)}
                        </Typography>
                    </RowView>
                    <Typography mediumGrey size14 lineHeight={16} style={{marginVertical: 5}}>
                        {transferDate(order.createdAt)}
                    </Typography>
                    <Typography
                        mediumGrey
                        size14
                        lineHeight={16}
                        style={{marginVertical: 5}}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}>
                        Giao đến: {order.address} {order.addressWard.pathWithType}
                    </Typography>
                    <RowView style={{marginVertical: 5}}>
                        <Typography mediumGrey size14 lineHeight={16}>
                            Số lượng: {'\t'}
                        </Typography>
                        <Typography mediumGrey size14 lineHeight={16} bold>
                            {historyStore.getTotalProduct(order.id)} sản phẩm
                        </Typography>
                        <View
                            style={{
                                width: 5,
                                height: 5,
                                borderRadius: 20,
                                backgroundColor: colors.mediumGrey,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: 10,
                            }}
                        />
                        <Typography
                            size14
                            lineHeight={16}
                            bold
                            color={OrderStatus.Cancel == order.status ? colors.error : colors.primary}>
                            {transferOrderStatus(order.status)}
                        </Typography>
                    </RowView>
                </View>
            </RowView>
        </TouchableOpacity>
    );
});
