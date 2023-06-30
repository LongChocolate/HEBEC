import React, {memo} from 'react';

import {SoLienLacSvg} from '@/assets/svg/SoLienLacSvg';
import {REM} from '@/styles/dimensions';
import {colors} from '@/styles/theme';
import {View, ScrollView, FlatList, StyleSheet} from 'react-native';
import Button from '../../components/Button/MyButton';
import {ShadowCard} from '../../components/Card/ShadowCard';
import Typography from '../../components/Text/Typography';
import {RowView} from '../../components/View/RowView';
const ContentAdvertisement = () => {
    return (
        <View style={styles.container}>
            <ShadowCard style={styles.containerAdvBook}>
                <RowView style={styles.rowViewOrderBook} justifyContent="space-around">
                    <Typography
                        size16
                        lineHeight={19}
                        style={{width: 200 * REM, paddingHorizontal: 2, justifyContent: 'center'}}
                        white>
                        Năm học mới đến rồi đặt sách ngay thôi các bạn ơi!
                    </Typography>
                    <Button
                        title="Đặt sách"
                        containerStyle={{backgroundColor: '#FFEE58', width: 130 * REM}}
                        titleStyle={{color: colors.primary}}
                    />
                </RowView>
            </ShadowCard>

            <ShadowCard style={styles.containerAdvSoLienLac}>
                <RowView style={styles.rowViewSoLienLac} justifyContent="space-around">
                    <View style={{flexDirection: 'column'}}>
                        <RowView style={{marginVertical: 5}}>
                            <SoLienLacSvg selected />
                            <Typography size16 lineHeight={24} primary bold style={{marginHorizontal: 5}}>
                                Sổ liên lạc online
                            </Typography>
                        </RowView>
                        <Typography style={{opacity: 0.5, width: 200 * REM}} primary size14 lineHeight={16}>
                            Dễ dàng quản lý việc học tập của con
                        </Typography>
                    </View>
                    <Button
                        title="Sổ liên lạc"
                        containerStyle={{backgroundColor: colors.primary, width: 130 * REM}}
                        titleStyle={{color: colors.white}}
                        border
                    />
                </RowView>
            </ShadowCard>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerAdvBook: {
        backgroundColor: colors.primary,
        borderRadius: 14,
        marginVertical: 10,
    },
    containerAdvSoLienLac: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 14,
        marginVertical: 10,
    },
    rowViewOrderBook: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    rowViewSoLienLac: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
});
export default memo(ContentAdvertisement);
