import React from "react";
import {
    View,
    Image
} from "react-native";
import { Container } from "native-base";
import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '@/styles/dimensions';
import MyButton from "../Button";
import { TextLight, TextBold } from "../Text";
import { danger, colorTitle } from '@/styles/color';
import appStyle from '@/styles/appStyle';
interface IAppProps {
    image?: any;
    title?: string;
    content?: string;
    contentMid?: string;
    contentAfter?: string;
    textButton?: string;
    onPress?: any;
}

const ScreenDone = ({
    image,
    title,
    content,
    contentMid,
    contentAfter,
    textButton,
    onPress,
}: IAppProps) => (
        <Container style={styles.container}>
            <View style={{ width: SCREEN_WIDTH * 0.5, aspectRatio: 480 / 445 }}>
                <Image style={appStyle.image} source={image} />
            </View>
            <View style={styles.content}>
                <TextBold style={styles.textTitle}>{title}</TextBold>
                <TextLight style={styles.textContent}>
                    {content}
                    <TextLight style={{ color: danger }}> {contentMid} </TextLight>
                    {contentAfter}
                </TextLight>
                <MyButton
                    onPress={onPress}
                    title={textButton}
                    colorGradient1={'#00D292'}
                    colorGradient2={'#04C1A3'}
                    style={{ width: SCREEN_WIDTH * 0.6 }} />
            </View>
        </Container>
    );


export default ScreenDone


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    textTitle: {
        fontSize: 26,
        color: colorTitle,
        lineHeight: 32,
    },
    textContent: {
        fontSize: 17,
        color: colorTitle,
        lineHeight: 24,
        marginVertical: 20,
        textAlign: 'center'
    }
});
