import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/styles/dimensions';
import {colors} from '@/styles/theme';
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, FlatList, Animated} from 'react-native';
import {CarouselItem} from './CarouselItems';

export const Carousel = ({data}: any) => {
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, SCREEN_WIDTH);

    if (data && data.length) {
        return (
            <View>
                <FlatList
                    data={data}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    snapToAlignment={'center'}
                    renderItem={({item, index}) => {
                        return <CarouselItem item={item} key={index} />;
                    }}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: scrollX,
                                    },
                                },
                            },
                        ],
                        {useNativeDriver: false},
                    )}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    {data.map((_, index) => {
                        let opacity = position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={index}
                                style={{
                                    opacity,
                                    height: 10,
                                    width: 10,
                                    margin: 8,
                                    backgroundColor: colors.darkGrey,
                                    borderRadius: 5,
                                }}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }
};
