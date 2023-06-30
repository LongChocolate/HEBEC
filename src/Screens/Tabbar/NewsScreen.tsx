import {ActivityIndicator, Animated, FlatList, InteractionManager, ToastAndroid, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '@/styles/theme';
import {Header} from '@/layouts/Header/Header';
import {observer} from 'mobx-react';
import {ItemNews} from '@/components/Item/ItemNews';
import {newsStore} from '@/store/NewsStore';
import {NavigationScreens} from '@/utils/enum';
import {SCREEN_WIDTH} from '@/styles/dimensions';

const NewsScreen = observer(({navigation}) => {
    const [loadingMore, setLoadingMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        const result = await newsStore.fetch(1, 5, true);
        setRefreshing(false);
    };

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height;
    };

    const handleLoadMore = async () => {
        const result = await newsStore.fetch(newsStore.getCurrentPage + 1, 5);
        if (result.status !== 200) {
            ToastAndroid.show(result.data.data.message + '', ToastAndroid.LONG);
        }
        if (result.data.data.data.length === 0) {
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        if (newsStore.getNews.length < 5) {
            setLoadingMore(false);
        }
    }, [newsStore.getNews]);
    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: 'white',
            }}>
            <Header cart title="Tin tức" />
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
                data={newsStore.getNews}
                renderItem={({item, index}) => {
                    return (
                        <ItemNews
                            key={index}
                            item={item}
                            onPress={() => navigation.navigate(NavigationScreens.DetailNewsFeed, {newsId: item.id})}
                        />
                    );
                }}
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
        </Animated.View>
    );
});

export default NewsScreen;
