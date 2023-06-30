import {ActivityIndicator, FlatList, ToastAndroid, View, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '@/styles/theme';
import {Header} from '@/layouts/Header/Header';
import * as notiApi from '@/api/notificationCustomer.api';
import {userStore} from '@/store/UserStore';
import {notiStore} from '@/store/NotifcationStore';
import {observer} from 'mobx-react';

import {ItemNotification} from '@/components/Item/ItemNotification';
import Typography from '@/components/Text/Typography';
import {NavigationScreens, NotificationCustomerType} from '@/utils/enum';
import {StackActions} from '@react-navigation/native';
import CustomModal from '@/components/Modal/CustomModal';

const NotificationScreen = observer(({navigation}) => {
    const [loadingMore, setLoadingMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await notiStore.fetch(1, 5, userStore.getToken, true);
        setRefreshing(false);
    };

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height;
    };

    const handleLoadMore = async () => {
        const result = await notiStore.fetch(notiStore.getCurrentPage + 1, 5, userStore.getToken);
        if (result.status !== 200) {
            ToastAndroid.show(result.data.data.message + '', ToastAndroid.LONG);
        }
        if (result.data.data.notificationCustomers.length === 0) {
            setLoadingMore(false);
        }
    };

    const handleCheckNoti = async (item) => {
        switch (item.type) {
            case NotificationCustomerType.News:
                navigation.navigate(NavigationScreens.DetailNewsFeed, {news: item.news});
                break;
            case NotificationCustomerType.Order:
                navigation.dispatch(StackActions.push(NavigationScreens.History));
                break;
            case NotificationCustomerType.Notification:
                navigation.dispatch(StackActions.push(NavigationScreens.DetailNotification, {noti: item.notification}));
                break;
            default:
                break;
        }
        handleSeenNoti(item.id);
    };

    const handleSeenNoti = async (notiId: number) => {
        const result = await notiApi.postSeenNotification(userStore.getToken, notiId);

        const data = result.data;
        if (result.status === 200) {
            notiStore.setSeen(notiId);
        } else {
            ToastAndroid.show(data.message, ToastAndroid.LONG);
        }
    };

    const handleSeenAll = async () => {
        const result = await notiApi.postSeenAll(userStore.getToken);
        const data = result.data;
        if (result.status === 200) {
            setRefreshing(true);
            await notiStore.fetch(1, 5, userStore.getToken, true);
            setRefreshing(false);
        } else {
            ToastAndroid.show(data.message, ToastAndroid.LONG);
        }
    };

    useEffect(() => {
        if (notiStore.getNoti.length < 5) {
            setLoadingMore(false);
        }
    }, [notiStore.getNoti]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}>
            <Header cart title="Thông báo" />

            {userStore.getLogin && (
                <>
                    <Typography
                        primary
                        size16
                        bold
                        style={{paddingHorizontal: 20, paddingVertical: 10}}
                        onPress={() => setIsVisible(true)}>
                        Đánh dấu đã đọc tất cả
                    </Typography>
                    <FlatList
                        contentContainerStyle={{
                            flexGrow: 1,
                            backgroundColor: colors.white,
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                        }}
                        onScroll={async ({nativeEvent}) => {
                            if (isCloseToBottom(nativeEvent) && loadingMore) {
                                setLoadingMore(true);
                                await handleLoadMore();
                            }
                        }}
                        data={notiStore.getNoti}
                        renderItem={({item, index}) => {
                            return <ItemNotification item={item} key={index} onPress={() => handleCheckNoti(item)} />;
                        }}
                        initialNumToRender={7}
                        showsVerticalScrollIndicator={false}
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
                </>
            )}
            <CustomModal
                isVisible={isVisible}
                title="Đọc thông báo"
                message="Bạn có chắc chắn muốn đọc hết thông báo?"
                closeModal={setIsVisible}
                funcAction={handleSeenAll}
                animationInTiming={750}
                animationIn={'slideInDown'}
                animationOutTiming={750}
                animationOut={'slideOutDown'}
                action
            />
        </View>
    );
});

export default NotificationScreen;
