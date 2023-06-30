import {ActivityIndicator, FlatList, ScrollView, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {colors} from '@/styles/theme';
import {Header} from '@/layouts/Header/Header';
import {observer} from 'mobx-react';
import {NavigationScreens} from '@/utils/enum';

import {historyStore} from '@/store/HistoryStore';
import {ItemOrderHistory} from '@/components/Item/ItemOrderHistory';
import {NoResultHistoryOrderSvg} from '@/assets/svg/NoResultHistoryOrderSvg';
import Typography from '@/components/Text/Typography';

const HistoryOrderScreen = observer(({navigation}) => {
    const [loadingMore, setLoadingMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        const result = await historyStore.fetch(1, 5, true);
        setRefreshing(false);
    };

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height;
    };

    const handleLoadMore = async () => {
        const result = await historyStore.fetch(historyStore.getCurrentPage + 1, 5);
        if (result.status !== 200) {
            ToastAndroid.show(result.data.data.message + '', ToastAndroid.LONG);
        }
        if (result.data.data.data.length === 0) {
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        if (historyStore.getHistory.length < 5) {
            setLoadingMore(false);
        }
    }, [historyStore.getHistory]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}>
            <Header onClickLeft={() => navigation.goBack()} back title="Lịch sử mua hàng" />

            <FlatList
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                onScroll={async ({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent) && loadingMore) {
                        setLoadingMore(true);
                        await handleLoadMore();
                    }
                }}
                data={historyStore.getHistory}
                renderItem={({item, index}) => {
                    return (
                        <ItemOrderHistory
                            order={item}
                            key={index}
                            onPress={() => navigation.navigate(NavigationScreens.DetailHistoryShop, {order: item})}
                        />
                    );
                }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => {
                    return (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <NoResultHistoryOrderSvg />
                            <Typography size16 lineHeight={19} darkGrey center style={{marginTop: 20}}>
                                Bạn chưa đặt sách lần nào
                            </Typography>
                        </View>
                    );
                }}
                refreshing={refreshing}
                onRefresh={() => handleRefresh()}
                ListFooterComponent={() => {
                    return (
                        <>
                            {loadingMore ? (
                                <View
                                    style={{
                                        flex: 1,
                                        marginVertical: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <ActivityIndicator size="large" color={colors.primary} />
                                </View>
                            ) : (
                                <></>
                            )}
                        </>
                    );
                }}
            />
        </View>
    );
});

export default HistoryOrderScreen;
