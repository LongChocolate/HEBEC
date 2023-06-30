import React, {memo, ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import Typography from '../Text/Typography';
import Modal, {ModalProps} from 'react-native-modal/dist/modal';
import {SCREEN_HEIGHT} from '@/styles/dimensions';
import {ShadowCard} from '../Card/ShadowCard';
import {colors} from '@/styles/theme';
import {RowView} from '../View/RowView';
import {ButtonCustom} from '../Button/Button';

interface ModalCustomProps extends ModalProps {
    isVisible: boolean;
    children?: ReactNode;
    message?: string;
    title?: string;
    error?: boolean;
    action?: boolean;
    notCloseWhenSubbmit?: boolean;
    funcAction?: () => void;
    closeModal: () => void;
}

const ModalCustom = ({
    isVisible,
    children,
    message,
    title,
    error,
    action,
    notCloseWhenSubbmit,
    funcAction,
    closeModal,
    ...props
}: ModalCustomProps) => {
    return (
        <Modal isVisible={isVisible} {...props}>
            <ShadowCard>
                <View style={styles.containerModalAlert}>
                    {message ? (
                        <View style={{paddingHorizontal: 20}}>
                            <Typography color={error ? colors.error : colors.primary} bold center>
                                {title}
                            </Typography>
                            <Typography darkGrey style={{marginTop: 5, marginBottom: 15}}>
                                {message}
                            </Typography>
                            <RowView justifyContent="space-between">
                                {action ? (
                                    <ButtonCustom onPress={() => (action ? closeModal(false) : null)}>
                                        <Typography error size14 bold>
                                            CANCEL
                                        </Typography>
                                    </ButtonCustom>
                                ) : (
                                    <View></View>
                                )}
                                <ButtonCustom
                                    onPress={() => {
                                        if (action) {
                                            funcAction();
                                            if (!notCloseWhenSubbmit) {
                                                closeModal(false);
                                            }
                                        } else {
                                            closeModal(false);
                                        }
                                    }}>
                                    <Typography primary size14 bold>
                                        OK
                                    </Typography>
                                </ButtonCustom>
                            </RowView>
                        </View>
                    ) : (
                        children
                    )}
                </View>
            </ShadowCard>
        </Modal>
    );
};

const styles = StyleSheet.create({
    // Modal

    containerModalAlert: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.2,
        backgroundColor: 'white',
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'center',
    },

});
export default memo(ModalCustom);
