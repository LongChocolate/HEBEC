import React from 'react';
import ItemMenuProduct from '@/components/Item/ItemMenuProduct';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {colors} from '@/styles/theme';
import {NoResultProductSvg} from '@/assets/svg/NoResultProductSvg';
import Typography from '@/components/Text/Typography';

export const ListProduct = ({data, loading, empty, containerStyle, cartStyle, imageStyle, ...props}) => {
    return (
        <FlatList
            contentContainerStyle={{flexGrow: 1, backgroundColor: colors.white}}
            data={data}
            renderItem={({item, index}) => {
                return (
                    <ItemMenuProduct
                        key={index}
                        item={item}
                        containerStyle={containerStyle}
                        cartStyle={cartStyle}
                        imageStyle={imageStyle}
                    />
                );
            }}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            {...props}
            ListFooterComponent={() => {
                return (
                    <>
                        {loading ? (
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
            ListEmptyComponent={() => {
                return (
                    <>
                        {empty && (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <NoResultProductSvg />
                                <Typography lineHeight={19} size16 color="#9E9E9E" style={{marginVertical: 15}}>
                                    Không có kết quả phù hợp.
                                </Typography>
                            </View>
                        )}
                    </>
                );
            }}
        />
    );
};
