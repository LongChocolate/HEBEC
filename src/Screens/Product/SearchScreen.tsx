import {ActivityIndicator, ToastAndroid, View, StyleSheet} from 'react-native';
import React, {useCallback,useEffect, useLayoutEffect, useState} from 'react';

import {colors} from '@/styles/theme';
import {ButtonCustom} from '@/components/Button/Button';

import Typography from '@/components/Text/Typography';

import {RowView} from '@/components/View/RowView';
import useDebounce from '@/hooks/useDebounce';
import Modal from 'react-native-modal/dist/modal';
import {REM, SCREEN_HEIGHT, SCREEN_WIDTH} from '@/styles/dimensions';
import {CloseXSvg} from '@/assets/svg/CloseXSvg';
import Button from '@/components/Button/MyButton';
import {Picker} from '@react-native-picker/picker';

import * as booksApi from '@/api/book.api';
import * as categoriesApi from '@/api/category.api';
import * as gradesApi from '@/api/grade.api';

import {ListProduct} from '@/layouts/ProductScreen/ListProduct';
import {Header} from '@/layouts/Header/Header';
import {Tag} from '@/components/Tag/Tag';
import SearchBar from '@/components/Input/SearchBar';
import {userStore} from '@/store/UserStore';
import {observer} from 'mobx-react';

const SearchScreen = observer(({navigation, route}) => {
    const loadMoreCate = route.params.cate;
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState({data: [], total: 0, currentPage: 1});

    const [loadingSearch, setLoadingSearch] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const [filterValue, setFilterValue] = useState({
        categoryId: loadMoreCate ? loadMoreCate.id : null,
        gradeId: null,
        promotion: null,
    });
    const [filterTitle, setFilterTitle] = useState({
        categoryId: loadMoreCate ? loadMoreCate.name : null,
        gradeId: null,
        promotion: null,
    });
    const [apply, setApply] = useState(loadMoreCate ? true : false);

    const [itemPicker, setItemPicker] = useState({
        categoryId: [{name: 'Tất cả', id: null}],
        gradeId: [{name: 'Tất cả', id: null}],
        promotion: [
            {label: 'Tất cả', value: null},
            {label: 'Giá từ thấp đến cao', value: 'true'},
            {label: 'Giá từ cao đến thấp', value: 'false'},
        ],
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClearSearch = useCallback(() => {
        setSearchValue('');
        setSearchResult({data: [], total: 0, currentPage: 1});
        setIsEmpty(false);
        setLoadingSearch(false);
        setLoadingMore(false);
    }, []);

    const handleChangeValue = useCallback((value) => {
        setSearchValue(value);
        if (!!value) {
            setLoadingSearch(true);
            setLoadingMore(true);
            setIsEmpty(false);
        } else {
            setLoadingSearch(false);
            setLoadingMore(false);
            setIsEmpty(false);
        }
        setSearchResult({data: [], total: 0, currentPage: 1});
    }, []);

    const debounced = useDebounce(searchValue.trim(), !!searchValue ? 400 : 0);

    const handleCloseModal = useCallback(() => {
        if (!apply) {
            setFilter();
        }
        setIsModalVisible(false);
    }, []);

    const handleApplyFilter = () => {
        setIsModalVisible(false);
        if (filterValue.categoryId || filterValue.gradeId || filterValue.promotion) {
            setApply(true);
            handleClearSearch();
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        loadBook();
        setLoadingSearch(false);
    };

    const setFilter = (value = [null, null, null], title = [null, null, null]) => {
        setFilterValue({
            categoryId: value[0],
            gradeId: value[1],
            promotion: value[2],
        });
        setFilterTitle({
            categoryId: title[0],
            gradeId: title[1],
            promotion: title[2],
        });
        if (!filterValue.categoryId && !filterValue.gradeId && !filterValue.promotion) {
            setApply(false);
        }
    };

    const fetchBooks = async (currentPage, refreshing = false) => {
        //axois
        setLoadingMore(true);
        const result = await booksApi.searchBooks(
            userStore.getToken,
            currentPage,
            debounced,
            filterValue.categoryId,
            filterValue.gradeId,
            filterValue.promotion == 'true',
        );

        const dataRequest = result.data;
        if (result.status == 200) {
            if (refreshing) {
                setSearchResult({
                    data: dataRequest.data.data,
                    total: dataRequest.data.total,
                    currentPage: currentPage,
                });
            } else {
                setSearchResult({
                    data: searchResult.data.concat(dataRequest.data.data),
                    total: dataRequest.data.total,
                    currentPage: currentPage,
                });
            }
            if (dataRequest.data.total < 10) {
                setLoadingMore(false);
            }

            setRefreshing(false);
            setLoadingSearch(false);

            return dataRequest.data.data.length !== 0;
        } else if (!result.status) {
            ToastAndroid.show(dataRequest.message + '', ToastAndroid.LONG);
        }
        return false;
    };

    const loadBook = useCallback(() => {
        if (!!debounced || apply) {
            setLoadingSearch(true);
            const result = fetchBooks(searchResult.currentPage);
            if (!result) {
                setIsEmpty(true);
            }
        }
    }, [debounced, apply]);

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const heightTabBottom = 60;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - heightTabBottom;
    };

    const handleLoadMore = () => {
        const result = fetchBooks(searchResult.currentPage + 1);
        return result;
    };

    useLayoutEffect(() => {
        const fetchCategories = async () => {
            //axois
            const result = await categoriesApi.getCategory(userStore.getToken);
            const data = result.data.data;

            if (result.status == 200) {
                return data.categories;
            }
            return null;
        };

        const fetchGrades = async () => {
            //axois
            const result = await gradesApi.getGrades(userStore.getToken);
            const data = result.data.data;
            if (result.status == 200) {
                return data;
            }
            return null;
        };
        const fetchAll = async () => {
            const categories = await fetchCategories();
            const grades = await fetchGrades();

            setItemPicker({
                categoryId: itemPicker.categoryId.concat(categories),
                gradeId: itemPicker.gradeId.concat(grades),
                promotion: itemPicker.promotion,
            });
        };

        fetchAll();
    }, [navigation]);

    useEffect(() => {
        loadBook();
    }, [debounced, apply]);

    return (
        <View style={{flex: 1, backgroundColor: colors.white}}>
            <Header onClickLeft={() => navigation.goBack()} onClickRight={() => setIsModalVisible(true)} filter back>
                <SearchBar onChangeText={handleChangeValue} value={searchValue} />
            </Header>

            {apply && (
                <RowView style={{marginTop: 20, marginHorizontal: 10, flexWrap: 'wrap'}}>
                    {filterTitle.categoryId && (
                        <Tag
                            title={filterTitle.categoryId}
                            onPress={() => {
                                setFilter(
                                    [null, filterValue.gradeId, filterValue.promotion],
                                    [null, filterTitle.gradeId, filterTitle.promotion],
                                );
                                handleClearSearch();
                            }}
                        />
                    )}
                    {!!filterTitle.gradeId && (
                        <Tag
                            title={filterTitle.gradeId}
                            onPress={() => {
                                setFilter(
                                    [filterValue.categoryId, null, filterValue.promotion],
                                    [filterTitle.categoryId, null, filterTitle.promotion],
                                );
                                handleClearSearch();
                            }}
                        />
                    )}
                    {filterTitle.promotion && (
                        <Tag
                            title={filterTitle.promotion}
                            onPress={() => {
                                setFilter(
                                    [filterValue.categoryId, filterValue.gradeId, null],
                                    [filterTitle.categoryId, filterTitle.gradeId, null],
                                );
                                handleClearSearch();
                            }}
                        />
                    )}
                </RowView>
            )}
            {loadingSearch ? (
                <View
                    style={{
                        flex: 1,
                        marginVertical: 20,
                    }}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 10,
                        backgroundColor: colors.white,
                    }}>
                    {searchResult.data.length !== 0 && (
                        <RowView style={{padding: 10, marginVertical: 20}}>
                            <Typography size16 lineHeight={19}>
                                Có
                            </Typography>
                            <Typography size16 primary lineHeight={19} style={{paddingHorizontal: 5}}>
                                {searchResult.total}
                            </Typography>
                            <Typography size16 lineHeight={19} style={{paddingHorizontal: 3}}>
                                kết quả phù hợp
                            </Typography>
                        </RowView>
                    )}

                    <ListProduct
                        data={searchResult.data}
                        onScroll={async ({nativeEvent}) => {
                            if (isCloseToBottom(nativeEvent) && loadingMore) {
                                setLoadingMore(true);
                                const result = await handleLoadMore();
                                if (!result) {
                                    setLoadingMore(false);
                                }
                            }
                        }}
                        loading={loadingMore}
                        empty={isEmpty}
                        refreshing={refreshing}
                        onRefresh={() => handleRefresh()}
                        containerStyle={{
                            width: '45%',
                            marginHorizontal: 10,
                            marginBottom: 20,
                            flexDirection: 'column',
                        }}
                        cartStyle={{width: '100%'}}
                        imageStyle={{
                            width: '100%',
                            height: 177,
                            borderTopLeftRadius: 7,
                            borderTopRightRadius: 7,
                        }}
                    />
                </View>
            )}
            <Modal
                onBackButtonPress={() => handleCloseModal()}
                onBackdropPress={() => handleCloseModal()}
                isVisible={isModalVisible}
                style={{padding: 0, margin: 0}}
                animationIn="fadeInRight"
                animationOut="fadeOutRightBig">
                <View style={styles.containerModalAlert}>
                    <View style={{borderBottomWidth: 1, borderBottomColor: colors.grey}}>
                        <RowView justifyContent="space-between" style={{padding: 20}}>
                            <Typography size16 lineHeight={24} bold primary transform="uppercase">
                                bộ lọc
                            </Typography>
                            <ButtonCustom
                                onPress={() => {
                                    handleCloseModal();
                                }}
                                containerStyle={{width: 50}}>
                                <CloseXSvg />
                            </ButtonCustom>
                        </RowView>
                    </View>

                    <RowView justifyContent="space-between" style={{paddingHorizontal: 20, marginVertical: 15}}>
                        <Typography size16 lineHeight={19} darkGrey style={{width: REM * 90}}>
                            Loại sách
                        </Typography>
                        <Picker
                            selectedValue={filterValue.categoryId}
                            style={{flex: 1, height: 50}}
                            onValueChange={(itemValue, itemIndex) => {
                                setFilter(
                                    [itemValue, filterValue.gradeId, filterValue.promotion],
                                    [itemPicker.categoryId[itemIndex].name, filterTitle.gradeId, filterTitle.promotion],
                                );
                            }}>
                            {itemPicker.categoryId.map((item, index) => {
                                return <Picker.Item label={item.name} value={item.id} key={index} />;
                            })}
                        </Picker>
                    </RowView>

                    <RowView justifyContent="space-between" style={{paddingHorizontal: 20, marginVertical: 15}}>
                        <Typography size16 lineHeight={19} darkGrey style={{width: REM * 90}}>
                            Lớp
                        </Typography>
                        <Picker
                            selectedValue={filterValue.gradeId}
                            style={{flex: 1, height: 50}}
                            onValueChange={(itemValue, itemIndex) => {
                                setFilter(
                                    [filterValue.categoryId, itemValue, filterValue.promotion],
                                    [filterTitle.categoryId, itemPicker.gradeId[itemIndex].name, filterTitle.promotion],
                                );
                            }}>
                            {itemPicker.gradeId.map((item, index) => {
                                return <Picker.Item label={item.name} value={item.id} key={index} />;
                            })}
                        </Picker>
                    </RowView>

                    <RowView style={{paddingHorizontal: 20, marginVertical: 15}}>
                        <Typography size16 lineHeight={19} darkGrey style={{width: REM * 90}}>
                            Giá
                        </Typography>
                        <Picker
                            selectedValue={filterValue.promotion}
                            style={{flex: 1, height: 50}}
                            onValueChange={(itemValue, itemIndex) => {
                                setFilter(
                                    [filterValue.categoryId, filterValue.gradeId, itemValue],
                                    [
                                        filterTitle.categoryId,
                                        filterTitle.gradeId,
                                        itemPicker.promotion[itemIndex].label,
                                    ],
                                );
                            }}>
                            {itemPicker.promotion.map((item, index) => {
                                return <Picker.Item label={item.label} value={item.value} key={index} />;
                            })}
                        </Picker>
                    </RowView>

                    <View style={{marginTop: SCREEN_HEIGHT * 0.4}}>
                        <RowView justifyContent="space-around">
                            <Button
                                title="Clear"
                                border
                                containerStyle={{width: REM * 125}}
                                onPress={() => {
                                    setApply(false);
                                    setFilter();
                                }}
                            />
                            <Button
                                title="Áp dụng"
                                containerStyle={{width: REM * 125}}
                                onPress={() => handleApplyFilter()}
                            />
                        </RowView>
                    </View>
                </View>
            </Modal>
        </View>
    );
});

const styles = StyleSheet.create({
    // Modal

    containerModalAlert: {
        height: '100%',
        width: SCREEN_WIDTH * 0.8,
        backgroundColor: colors.white,
        position: 'absolute',
        right: 0,
    },
});

export default SearchScreen;
