import {ActivityIndicator, FlatList, Image, ScrollView, View, StyleSheet, ToastAndroid} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {StackActions} from '@react-navigation/native';

import {colors} from '@/styles/theme';
import {CardView} from '@/components/Card/CardView';
import * as fetchBook from '@/api/book.api';
import Typography from '@/components/Text/Typography';
import {formatPrice, transferDate} from '@/utils/helper';
import {RowView} from '@/components/View/RowView';
import {ButtonCustom} from '@/components/Button/Button';
import {MinusSvg} from '@/assets/svg/MinusSvg';
import {PlusCircleSvg} from '@/assets/svg/PlusCircleSvg';
import Button from '@/components/Button/MyButton';
import {InformationSvg} from '@/assets/svg/InformationSvg';
import {REM, SCREEN_HEIGHT, SCREEN_WIDTH} from '@/styles/dimensions';
import {BASE_URL} from '../../../config';
import {DescriptionSvg} from '@/assets/svg/DescriptionSvg';
import {NavigationScreens} from '@/utils/enum';
import {Header} from '@/layouts/Header/Header';
import {observer} from 'mobx-react';
import {AddToCartSvg} from '@/assets/svg/AddToCartSvg';
import Modal from 'react-native-modal';
import {cartStore} from '@/store/CartStore';
import {IProduct} from '@/types/product';
import {userStore} from '@/store/UserStore';
import {ImageView} from '@/components/Image/ImageDefault';
import {LabelSale} from '@/components/Text/LabelSale';
import ItemMenuProduct from '@/components/Item/ItemMenuProduct';

const ProductDetailScreen = observer(({navigation, route}) => {
    const [loading, setLoading] = useState(true);

    const [book, setBook] = useState(route.params.book);
    const [imageBook, setImageBook] = useState(book.thumbnail);
    const [booksRelation, setBooksRelation] = useState([]);

    const [amount, setAmount] = useState(1);

    const [readMore, setReadMore] = useState(false);

    const [showAddToCart, setShowAddToCart] = useState(false);

    const handleAddToCart = async () => {
        const product: IProduct = {
            bookId: book.id,
            name: book.name,
            price: book.finalPrice,
            quantity: amount,
        };
        setShowAddToCart(true);

        if (amount !== 0) {
            cartStore.addProduct(product);
        }

        const timeInterval = await setInterval(() => {
            setShowAddToCart(false);
        }, 2000);

        setTimeout(() => {
            clearInterval(timeInterval);
        }, 3000);
    };

    const handleIncrease = () => {
        setAmount(amount + 1);
    };

    const handleDecrease = () => {
        if (amount !== 0) {
            setAmount(amount - 1);
        }
    };

    const renderItemRelation = ({item, index}) => {
        return (
            <ItemMenuProduct
                onClick={true}
                item={item}
                key={index}
                imageStyle={{
                    width: '100%',
                    height: 100,
                    borderTopLeftRadius: 7,
                    borderTopRightRadius: 7,
                }}
                containerStyle={{flexDirection: 'column', marginRight: 20, marginVertical: 10}}
                cartStyle={{width: 170, height: 185}}
            />
        );
    };

    const renderBookGalleries = (item, index) => {
        return (
            <View
                key={index}
                style={{
                    marginVertical: 5,
                    marginHorizontal: 3,
                    width: 60,
                    height: 60,
                }}>
                <CardView
                    onClick={true}
                    icon={item.thumbnail}
                    imageStyle={{width: 50, height: '100%'}}
                    containerStyle={{width: 60, height: '100%', alignItems: 'center'}}
                    onPress={() => setImageBook(item.thumbnail)}
                />
            </View>
        );
    };

    useEffect(() => {
        const fetchBooksRelation = async () => {
            const result = await fetchBook.getBooksRelation(userStore.getToken, book.id);
            const data = result.data.data;
            if (result.status === 200) {
                setBooksRelation(data.books);
                setLoading(false);
            }
            else {
                ToastAndroid.show(data.message,ToastAndroid.LONG)
            }
        };
        fetchBooksRelation();
    }, [navigation]);

    return (
        <View style={{flex: 1, backgroundColor: colors.white}}>
            <Header onClickLeft={() => navigation.goBack()} back title="Thông tin sách" cart />
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
                <ScrollView showsVerticalScrollIndicator={false} style={{position: 'relative'}}>
                    <ImageView
                        image={imageBook}
                        containerStyle={{
                            width: '100%',
                            height: 350,
                            borderTopLeftRadius: 7,
                            borderTopRightRadius: 7,
                        }}
                        mode="cover"
                    />
                    {book.originPrice !== book.finalPrice && (
                        <LabelSale
                            title={100 - (book.finalPrice / book.originPrice).toFixed(2) * 100 + ' %'}
                            containerStyle={{
                                position: 'absolute',
                                width: 100,
                                height: 20,
                                backgroundColor: colors.error,
                                right: -20,
                                top: 20,
                                transform: [{rotate: '45deg'}],
                            }}
                        />
                    )}
                    <FlatList
                        style={{
                            paddingHorizontal: 20,
                        }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={book.bookGalleries}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => renderBookGalleries(item, index)}
                    />

                    <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                        <Typography darkGrey lineHeight={30} size={20} bold>
                            {book.name}
                        </Typography>
                        <Typography lineHeight={35} error size={30} bold>
                            {formatPrice(book.finalPrice)}
                        </Typography>
                    </View>

                    <View style={{paddingHorizontal: 20, paddingVertical: 10, width: '100%'}}>
                        <RowView justifyContent="space-between">
                            <Typography bold size16 lineHeight={24}>
                                Số lượng đặt
                            </Typography>
                            <RowView justifyContent="space-around">
                                <ButtonCustom onPress={() => handleDecrease()} onLongPress={() => handleDecrease()}>
                                    <MinusSvg />
                                </ButtonCustom>
                                <Typography bold size14 lineHeight={16} style={{width: 30}} center>
                                    {amount}
                                </Typography>
                                <ButtonCustom onPress={() => handleIncrease()} onLongPress={() => handleIncrease()}>
                                    <PlusCircleSvg />
                                </ButtonCustom>
                            </RowView>
                        </RowView>
                        <Button
                            title="Thêm vào giỏ hàng"
                            containerStyle={{marginVertical: 15}}
                            onPress={() => handleAddToCart()}
                        />
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                        <RowView style={{paddingVertical: 10}}>
                            <InformationSvg />
                            <Typography primary bold size16 lineHeight={24} style={{paddingHorizontal: 15}}>
                                Thông tin chi tiết
                            </Typography>
                        </RowView>
                        <RowView justifyContent="flex-start" style={{paddingVertical: 10}}>
                            <Typography size16 lineHeight={19} style={{width: REM * 150}}>
                                Ngày xuất bản
                            </Typography>
                            <Typography bold size16 lineHeight={19} style={{paddingHorizontal: 15}}>
                                {book.publishDate && book.publishDate}
                            </Typography>
                        </RowView>
                        <RowView justifyContent="flex-start" style={{paddingVertical: 10}}>
                            <Typography size16 lineHeight={19} style={{width: REM * 150}}>
                                Kích thước
                            </Typography>
                            <Typography bold size16 lineHeight={19} style={{paddingHorizontal: 15}}>
                                {book.size}
                            </Typography>
                        </RowView>
                        <RowView justifyContent="flex-start" style={{paddingVertical: 10}}>
                            <Typography size16 lineHeight={19} style={{width: REM * 150}}>
                                Loại bìa
                            </Typography>
                            <Typography bold size16 lineHeight={19} style={{paddingHorizontal: 15}}>
                                {book.cover && book.cover.name}
                            </Typography>
                        </RowView>
                        <RowView justifyContent="flex-start" style={{paddingVertical: 10}}>
                            <Typography size16 lineHeight={19} style={{width: REM * 150}}>
                                Số trang
                            </Typography>
                            <Typography bold size16 lineHeight={19} style={{paddingHorizontal: 15}}>
                                {book.page}
                            </Typography>
                        </RowView>
                        <RowView justifyContent="flex-start" style={{paddingVertical: 10}}>
                            <Typography size16 lineHeight={19} style={{width: REM * 150}}>
                                Nhà xuất bản
                            </Typography>
                            <Typography bold size16 lineHeight={19} style={{paddingHorizontal: 15}}>
                                {book.publisher && book.publisher.name}
                            </Typography>
                        </RowView>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                        <RowView style={{paddingVertical: 10}}>
                            <DescriptionSvg />
                            <Typography primary bold size16 lineHeight={24} style={{paddingHorizontal: 15}}>
                                Mô tả sản phẩm
                            </Typography>
                        </RowView>
                        <View>
                            <Typography
                                numberOfLines={readMore ? undefined : 4}
                                ellipsizeMode="tail"
                                size16
                                lineHeight={24}>
                                {book.description}
                            </Typography>
                            {book.description && (
                                <Typography
                                    italic
                                    primary
                                    size16
                                    lineHeight={24}
                                    onPress={() => setReadMore(!readMore)}
                                    center>
                                    {readMore ? 'Thu gọn' : 'Xem thêm'}
                                </Typography>
                            )}
                        </View>

                        <RowView style={{paddingVertical: 10}}>
                            <DescriptionSvg />
                            <Typography primary bold size16 lineHeight={24} style={{paddingHorizontal: 15}}>
                                Sản phẩm liên quan
                            </Typography>
                        </RowView>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={booksRelation}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItemRelation}
                        />
                    </View>
                </ScrollView>
            )}

            {showAddToCart && (
                <View style={styles.containerModalAlert}>
                    <RowView justifyContent={amount === 0 ? 'center' : 'space-between'}>
                        <AddToCartSvg />
                        <Typography size16 transform="uppercase" center primary bold>
                            Đã thêm vào giỏ hàng
                        </Typography>
                    </RowView>
                </View>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    containerModalAlert: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.05,
        backgroundColor: 'white',
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 25,
        paddingVertical: 5,
        position: 'absolute',
        top: (SCREEN_HEIGHT * 2) / 3,
        left: SCREEN_WIDTH * 0.2 - 35,
        zIndex: 999,
    },
});
export default ProductDetailScreen;
