import React, {useState, useEffect, useCallback} from 'react';

import {View, ScrollView, ActivityIndicator, ToastAndroid, FlatList, Animated, StyleSheet, Text} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import * as NetInfo from '@react-native-community/netinfo';

import {colors} from '@/styles/theme';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/styles/dimensions';
import Typography from '@/components/Text/Typography';
import {HOME_MENU} from '@/constraints/homeMenu';
import MenuHome from '@/layouts/HomeScreen/MenuHome';
import {NavigationScreens} from '@/utils/enum';
import {StackActions} from '@react-navigation/native';
import {CarouselItem} from '@/components/Carousel/CarouselItems';
import {Header} from '@/layouts/Header/Header';
import SearchBar from '@/components/Input/SearchBar';
import {userStore} from '@/store/UserStore';
import {observer} from 'mobx-react';
import ListHotMenu from '@/layouts/HomeScreen/ListHotMenu';
import {NewsSvg} from '@/assets/svg/NewsSvg';
import {RowView} from '@/components/View/RowView';
import {ImageView} from '@/components/Image/ImageDefault';
import ItemMenuProduct from '@/components/Item/ItemMenuProduct';
import {newsStore} from '@/store/NewsStore';
import {bannerStore} from '@/store/BannerStore';
import {cateStore} from '@/store/CategoriesStore';

const HomeScreen = observer(({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [loadingPage, setLoadingPage] = useState(true);

    const [indexSlide, setIndexSlide] = useState(0);

    const renderItemCate = ({item, index}) => {
        return (
            <ItemMenuProduct
                item={item}
                key={index}
                imageStyle={{
                    width: '100%',
                    height: 100,
                    borderTopLeftRadius: 7,
                    borderTopRightRadius: 7,
                }}
                containerStyle={{flexDirection: 'column', marginLeft: 20, marginVertical: 10}}
                cartStyle={{width: 170, height: 185}}
            />
        );
    };

    const pagination = () => {
        return (
            <Pagination
                containerStyle={{
                    alignSelf: 'center',
                }}
                dotsLength={bannerStore.getSize}
                activeDotIndex={indexSlide}
                dotStyle={{
                    width: 7,
                    height: 7,
                    borderRadius: 5,
                    marginHorizontal: 2,
                    backgroundColor: colors.primary,
                }}
                inactiveDotStyle={
                    {
                        // Define styles for inactive dots here
                    }
                }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    };
    const handleFocusSearch = useCallback(() => {
        navigation.dispatch(StackActions.push(NavigationScreens.Search));
    }, []);

    const renderItemCarousel = ({item, index}) => {
        return <CarouselItem item={item} />;
    };

    useEffect(() => {
        setLoadingPage(true);

        const timeOutPage = setTimeout(() => {
            setLoadingPage(false);
        }, 1000);

        const myTimeOut = setTimeout(() => {
            setLoading(false);

            return () => clearTimeout(timeOutPage);
        }, 2000);

        return () => clearTimeout(myTimeOut);
    }, [userStore.getToken]);

    return (
        <Animated.View
            style={{
                backgroundColor: colors.white,
                flex: 1,
            }}>
            {/* Search Bar */}

            <Header cart>
                <SearchBar onFocus={handleFocusSearch} />
            </Header>
            {loadingPage ? (
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{backgroundColor: colors.white, paddingTop: 10}}>
                        <View
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: SCREEN_HEIGHT * 0.1,
                                backgroundColor: colors.primary,
                                marginBottom: 5,
                            }}
                        />

                        <Carousel
                            data={bannerStore.getBanner}
                            renderItem={renderItemCarousel}
                            itemWidth={SCREEN_WIDTH}
                            sliderWidth={SCREEN_WIDTH}
                            layout={'tinder'}
                            onSnapToItem={(index) => setIndexSlide(index)}
                        />
                        {pagination()}

                        <MenuHome menu={HOME_MENU} />

                        <ListHotMenu
                            data={newsStore.getHomeDisplay}
                            title="Tiêu điểm nổi bật"
                            icon={<NewsSvg selected />}
                            viewMore={() => navigation.navigate(NavigationScreens.News)}
                        />

                        {userStore.getLogin &&
                            (loading ? (
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
                                <View
                                    style={{
                                        width: '100%',
                                    }}>
                                    {cateStore.getCates.map((cate, index) => {
                                        return (
                                            <View key={index} style={{marginVertical: 10, position: 'relative'}}>
                                                <RowView justifyContent="space-between" style={{paddingHorizontal: 20}}>
                                                    <RowView>
                                                        <ImageView
                                                            image={cate.thumbnail}
                                                            containerStyle={{width: 20, height: 20}}
                                                            size={20}
                                                        />
                                                        <Typography
                                                            size16
                                                            lineHeight={24}
                                                            bold
                                                            style={{marginHorizontal: 10}}>
                                                            {cate.name}
                                                        </Typography>
                                                    </RowView>
                                                    <Typography
                                                        primary
                                                        size16
                                                        lineHeight={19}
                                                        bold
                                                        onPress={() =>
                                                            navigation.navigate(NavigationScreens.Search, {cate: cate})
                                                        }>
                                                        Xem thêm
                                                    </Typography>
                                                </RowView>
                                                <FlatList
                                                    showsHorizontalScrollIndicator={false}
                                                    horizontal={true}
                                                    data={cate.books}
                                                    renderItem={renderItemCate}
                                                    pagingEnabled
                                                />
                                            </View>
                                        );
                                    })}
                                </View>
                            ))}
                    </View>
                </ScrollView>
            )}
        </Animated.View>
    );
});
export default HomeScreen;
