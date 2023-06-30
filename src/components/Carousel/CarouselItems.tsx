import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/styles/dimensions';
import {BASE_URL} from '../../../config';
import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {ImageView} from '../Image/ImageDefault';

export const CarouselItem = ({item}) => {
    return (
        <View style={styles.cardView}>
            <ImageView image={item.thumbnail} containerStyle={styles.image} mode="stretch" />
        </View>
    );
};

const styles = StyleSheet.create({
    cardView: {
        width: SCREEN_WIDTH * 0.9,
        borderRadius: 14,
        marginHorizontal: 20,
    },
    image: {
        height: SCREEN_HEIGHT * 0.2,
        width: SCREEN_WIDTH * 0.9,
        borderRadius: 14,
        resizeMode: 'stretch',
    },
});
