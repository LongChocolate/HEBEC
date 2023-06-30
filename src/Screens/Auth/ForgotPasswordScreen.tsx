import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';

import {CloseSvg} from '@/assets/svg/CloseSvg';
import Typography from '@/components/Text/Typography';
import {REM, ASPECT_RATIO} from '@/styles/dimensions';
import {WaterMarkBackView} from '@/components/View/WaterMarkBackView';
import {ElInput} from '@/components/Input/ElInput';
import Button from '@/components/Button/MyButton';
import {sizes} from '@/styles/theme';

const ForgotPasswordScreen = ({navigation}) => {
    const [content, setContent] = useState(
        'Vui lòng nhập địa chỉ email liên kết với tài khoản của bạn để lấy lại mật khẩu.',
    );

    const [isReSentMail, setIsReSentMail] = useState(false);
    const [isSentMail, setIsSentMail] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const handleSendMail = () => {
        setContent(
            'Hệ thống HEBEC đã gửi cho bạn email khôi phục mật khẩu. Vui lòng kiểm tra email của bạn và làm theo hướng dẫn. Xin cảm ơn!',
        );
        setIsSentMail(!isSentMail);
        setShowTime(true);
    };

    return (
        <>
            <WaterMarkBackView />
            <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
                <CloseSvg size={30} />
            </TouchableOpacity>

            <Typography style={styles.titleForgetPassword} size25 lineHeight={29.3} uppercase primary>
                quên mật khẩu
            </Typography>

            <Typography lineHeight={27} size18 center style={styles.contentForgetPassword} darkGrey>
                {content}
            </Typography>

            {!isSentMail && (
                <ElInput label="Email" placeholder="Nhập địa chỉ email" containerStyle={styles.inputMail} />
            )}
            {isSentMail && (
                <TouchableOpacity style={styles.containerWaitReSentMail}>
                    <Typography
                        center
                        lineHeight={27}
                        size18
                        primary={isReSentMail}
                        mediumGrey={!isReSentMail}
                        style={styles.contentResentMail}>
                        Gửi lại yêu cầu khôi phục mật khẩu
                    </Typography>
                    {showTime && (
                        <Typography primary size18 bold lineHeight={27} center style={styles.timeoutResentMail}>
                            30s
                        </Typography>
                    )}
                </TouchableOpacity>
            )}
            <Button
                title={isSentMail ? 'Trở về' : 'Gửi'}
                containerStyle={styles.containerBtnSendMail}
                titleStyle={styles.titleBtnSendMail}
                onPress={() => handleSendMail()}
            />
        </>
    );
};

const styles = StyleSheet.create({
    closeIcon: {
        position: 'absolute',
        width: 30,
        height: 30,
        left: REM * 364,
        top: 40,
    },
    titleForgetPassword: {
        position: 'absolute',
        height: 29,
        left: REM * 100,
        top: 70,
        fontWeight: '700',
    },
    contentForgetPassword: {
        position: 'absolute',
        width: REM * 374,
        left: 20,
        top: 149,
    },
    inputMail: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: 5,
        padding: 0,
        position: 'absolute',
        width: REM * 374,
        height: 71,
        left: REM * 20,
        top: 223,
    },

    // Resend Mail
    containerWaitReSentMail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 5,
        position: 'absolute',
        width: REM * 326,
        height: 27,
        left: REM * 44,
        top: 270,
    },

    contentResentMail: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        paddingHorizontal: 3,
    },

    timeoutResentMail: {
        height: REM * 27,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '700',
        paddingHorizontal: 3,
    },

    //Btn send Mail

    containerBtnSendMail: {
        position: 'absolute',
        width: REM * 200,
        height: 50,
        left: REM * 107,
        top: 334,
    },
    titleBtnSendMail: {
        fontWeight: '700',
        lineHeight: 24,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: sizes.size16,
    },
});

export default ForgotPasswordScreen;
