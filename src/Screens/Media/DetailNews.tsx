import {ActivityIndicator, ScrollView, View, Image, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';

import {colors} from '@/styles/theme';
import {observer} from 'mobx-react';
import {NavigationScreens} from '@/utils/enum';

import {userStore} from '@/store/UserStore';
import {ButtonCustom} from '@/components/Button/Button';
import {BackSvg} from '@/assets/svg/BackSvg';
import {BASE_URL} from '../../../config';
import Typography from '@/components/Text/Typography';
import WebView from 'react-native-webview';
import {SCREEN_HEIGHT} from '@/styles/dimensions';
import * as fetch from './../../api/news.api';

const DetailNewsScreen = observer(({navigation, route}) => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchNews = async () => {
            const result = await fetch.getNewsId(route.params.newsId);
            const data = result.data.data;
            if (result.status === 200) {
                setNews(data);
            } else {
                ToastAndroid.show(data.message, ToastAndroid.LONG);
            }
            setLoading(false);
        };
        fetchNews();
    }, [route]);

    const [webViewHeight, setWebViewHeight] = useState(0);
    const onMessage = (event) => {
        setWebViewHeight(Number(event.nativeEvent.data));
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: colors.white}}>
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
                <>
                    <View style={{height: 200, position: 'relative'}}>
                        <ButtonCustom
                            onPress={() => navigation.goBack()}
                            containerStyle={{
                                backgroundColor: colors.primary,
                                borderRadius: 50,
                                width: 30,
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0.8,
                                zIndex: 999,
                                marginVertical: 20,
                                marginHorizontal: 20,
                            }}>
                            <BackSvg size={20} color={colors.white} />
                        </ButtonCustom>
                        <Image
                            source={{uri: BASE_URL + news.thumbnail}}
                            style={{width: '100%', height: '100%', position: 'absolute', top: 0, resizeMode: 'cover'}}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                        }}>
                        <Typography darkGrey bold size25 center transform="uppercase" style={{paddingVertical: 20}}>
                            {news.title}
                        </Typography>
                    </View>
                    <View style={{paddingHorizontal: 10, flex: 1}}>
                        <WebView
                            source={{
                                html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${news.body}</body><style> img { display: block; max-width: 100%; height: auto; } body{text-align:justify} </style></html>`,
                            }}
                            startInLoadingState={true}
                            style={{
                                width: '100%',
                                height: webViewHeight + 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                resizeMode: 'stretch',
                            }}
                            useWebKit={true}
                            showsVerticalScrollIndicator={false}
                            originWhitelist={['*']}
                            domStorageEnabled={true}
                            onMessage={onMessage}
                            javaScriptEnabled={true}
                            injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
                        />
                    </View>
                </>
            )}
        </ScrollView>
    );
});

export default DetailNewsScreen;
