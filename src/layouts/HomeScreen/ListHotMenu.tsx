import React, {memo, ReactNode} from 'react';
import {FlatList, View} from 'react-native';

import {RowView} from '@/components/View/RowView';
import Typography from '@/components/Text/Typography';
import {CardView} from '@/components/Card/CardView';
import {transferDate} from '@/utils/helper';
import {useNavigation} from '@react-navigation/native';
import {NavigationScreens} from '@/utils/enum';

interface NewsProps {
    data: any;
    title: string;
    icon?: ReactNode;
    viewMore?: () => void;
}

const ListHotMenu = ({data, title, icon, viewMore}: NewsProps) => {
    const {navigate} = useNavigation();
    const renderItemNews = ({item, index}) => {
        return (
            <View style={{flexDirection: 'column', marginLeft: 20, marginVertical: 10}}>
                <CardView
                    onClick={true}
                    key={index}
                    icon={item.thumbnail}
                    containerStyle={{width: 170, height: 185}}
                    imageStyle={{
                        width: '100%',
                        height: 100,
                        borderTopLeftRadius: 7,
                        borderTopRightRadius: 7,
                    }}
                    onPress={() => navigate(NavigationScreens.DetailNewsFeed, {newsId: item.id})}>
                    <View style={{padding: 15}}>
                        <Typography
                            darkGrey
                            size14
                            lineHeight={16}
                            style={{height: 32}}
                            ellipsizeMode="tail"
                            numberOfLines={2}>
                            {item.title}
                        </Typography>
                        <Typography size12 mediumGrey>
                            {transferDate(item.createdAt)}
                        </Typography>
                    </View>
                </CardView>
            </View>
        );
    };
    return (
        <View
            style={{
                width: '100%',
                marginBottom: 20,
            }}>
            <RowView justifyContent="space-between" style={{marginHorizontal: 20}}>
                <RowView>
                    {icon && icon}
                    <Typography size16 lineHeight={24} bold style={{marginHorizontal: 10}}>
                        {title}
                    </Typography>
                </RowView>
                <Typography primary size16 lineHeight={19} bold onPress={viewMore}>
                    Xem thêm
                </Typography>
            </RowView>

            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={data}
                    renderItem={renderItemNews}
                />
            </View>
        </View>
    );
};

export default memo(ListHotMenu);
