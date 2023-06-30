import {ActivityIndicator, ScrollView, View, Image} from 'react-native';
import React from 'react';

import {colors} from '@/styles/theme';
import {observer} from 'mobx-react';
import Typography from '@/components/Text/Typography';
import {Header} from '@/layouts/Header/Header';

const DetailNotificationScreen = observer(({navigation, route}) => {
    const noti = route.params.noti;

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: colors.white}}>
            <Header onClickLeft={() => navigation.goBack()} back title={noti.title} />
            <View style={{padding: 20}}>
                <Typography darkGrey bold size16>
                    {noti.body}
                </Typography>
            </View>
        </ScrollView>
    );
});

export default DetailNotificationScreen;
