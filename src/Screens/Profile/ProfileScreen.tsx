import {View, Image} from 'react-native';
import React from 'react';
import Typography from '@/components/Text/Typography';
import {RowView} from '@/components/View/RowView';
import {REM, SCREEN_WIDTH} from '@/styles/dimensions';
import {ImageView} from '@/components/Image/ImageDefault';

import {colors} from '@/styles/theme';
import {ShadowCard} from '@/components/Card/ShadowCard';
import {Header} from '@/layouts/Header/Header';
import {userStore} from '@/store/UserStore';
import {observer} from 'mobx-react';
const sizeImage = 125;

const ProfileScreen = observer(({navigation}) => {
    return (
        <View
            style={{
                flex: 1,
            }}>
            <Header onClickLeft={() => navigation.goBack()} back title="Thông tin tài khoản" />
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 15,
                    paddingBottom: 25,
                    paddingTop: 100,
                    backgroundColor: colors.grey,
                    position: 'relative',
                }}>
                {userStore.getInfo.image ? (
                    <Image
                        source={{uri: userStore.getInfo.image}}
                        style={{
                            position: 'absolute',
                            left: SCREEN_WIDTH / 2 - sizeImage / 2 + 10,
                            top: 30,
                            zIndex: 999,
                            height: sizeImage,
                            width: sizeImage,
                            borderRadius: sizeImage,
                            borderWidth: sizeImage * 0.02,
                            borderColor: colors.mediumGrey,
                            padding: 10,
                            backgroundColor: colors.grey,
                        }}
                    />
                ) : (
                    <ImageView
                        size={sizeImage}
                        containerStyle={{
                            position: 'absolute',
                            left: SCREEN_WIDTH / 2 - sizeImage / 2 + 10,
                            top: 30,
                            zIndex: 999,
                            height: sizeImage,
                            width: sizeImage,
                            borderRadius: sizeImage,

                            padding: 10,
                            backgroundColor: colors.grey,
                        }}
                        border
                    />
                )}
                <ShadowCard>
                    <View
                        style={{
                            flexDirection: 'column',
                            marginTop: 100,
                            paddingBottom: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: '#C4C4C4',
                            marginHorizontal: 20,
                        }}>
                        <Typography transform="uppercase" primary size18 lineHeight={21} bold>
                            thông tin chung
                        </Typography>
                        <RowView>
                            <Typography
                                darkGrey
                                size16
                                lineHeight={19}
                                style={{width: REM * 150, paddingRight: 15, paddingVertical: 10}}>
                                Họ & tên
                            </Typography>
                            <Typography
                                darkGrey
                                bold
                                size16
                                lineHeight={19}
                                style={{maxWidth: REM * 230, marginVertical: 10}}>
                                {userStore.getInfo.name}
                            </Typography>
                        </RowView>
                        <RowView>
                            <Typography
                                darkGrey
                                size16
                                lineHeight={19}
                                style={{width: REM * 150, paddingRight: 15, paddingVertical: 10}}>
                                Giới tính
                            </Typography>
                            <Typography
                                darkGrey
                                bold
                                size16
                                lineHeight={19}
                                style={{maxWidth: REM * 230, marginVertical: 10}}>
                                {userStore.getInfo.gender}
                            </Typography>
                        </RowView>
                        <RowView>
                            <Typography
                                darkGrey
                                size16
                                lineHeight={19}
                                style={{width: REM * 150, paddingRight: 15, paddingVertical: 10}}>
                                Ngày sinh
                            </Typography>
                            <Typography
                                darkGrey
                                bold
                                size16
                                lineHeight={19}
                                style={{maxWidth: REM * 230, marginVertical: 10}}>
                                ??
                            </Typography>
                        </RowView>
                        <RowView>
                            <Typography
                                darkGrey
                                size16
                                lineHeight={19}
                                style={{width: REM * 150, paddingRight: 15, paddingVertical: 10}}>
                                Lớp
                            </Typography>
                            <Typography
                                darkGrey
                                bold
                                size16
                                lineHeight={19}
                                style={{maxWidth: REM * 230, marginVertical: 10}}>
                                ??
                            </Typography>
                        </RowView>
                        <RowView>
                            <Typography
                                darkGrey
                                size16
                                lineHeight={19}
                                style={{width: REM * 150, paddingRight: 15, paddingVertical: 10}}>
                                Mã số
                            </Typography>
                            <Typography
                                darkGrey
                                bold
                                size16
                                lineHeight={19}
                                style={{maxWidth: REM * 230, marginVertical: 10}}>
                                ??
                            </Typography>
                        </RowView>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            marginTop: 25,
                            marginHorizontal: 20,
                            paddingBottom: 25,
                        }}>
                        <Typography transform="uppercase" primary size18 lineHeight={21} bold>
                            thông tin Khác
                        </Typography>
                        <RowView>
                            <Typography
                                darkGrey
                                size16
                                lineHeight={19}
                                style={{width: REM * 150, paddingRight: 15, paddingVertical: 10}}>
                                Địa chỉ
                            </Typography>
                            <Typography
                                darkGrey
                                bold
                                size16
                                lineHeight={19}
                                style={{maxWidth: REM * 200, marginVertical: 10}}>
                                {userStore.getInfo.address}
                            </Typography>
                        </RowView>
                        <RowView>
                            <Typography
                                darkGrey
                                size16
                                lineHeight={19}
                                style={{width: REM * 150, paddingRight: 15, paddingVertical: 10}}>
                                Số điện thoại
                            </Typography>
                            <Typography
                                darkGrey
                                bold
                                size16
                                lineHeight={19}
                                style={{maxWidth: REM * 230, marginVertical: 10}}>
                                {userStore.getInfo.phone}
                            </Typography>
                        </RowView>
                    </View>
                </ShadowCard>
            </View>
        </View>
    );
});

export default ProfileScreen;
