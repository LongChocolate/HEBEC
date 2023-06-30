import * as React from 'react';
import {View, TouchableHighlight} from 'react-native';
import Modal from 'react-native-modal';

import Typography from '../Text/Typography';

interface BottomModalProps {
    visible: boolean;
    titleModal?: string;
    onClose: () => void;
    children?: React.ReactChild;
}

const BottomModal = (props: BottomModalProps) => {
    return (
        <Modal
            isVisible={props.visible}
            onBackdropPress={props.onClose}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View
                style={{
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingHorizontal: 15,
                    paddingTop: 14,
                }}>
                <View
                    style={{
                        height: 5,
                        borderRadius: 50,
                        width: 54,
                        alignSelf: 'center',
                        backgroundColor: '#E9EDF6',
                        marginTop: -5,
                    }}></View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 18,
                        justifyContent: 'space-between',
                        paddingBottom: 22,
                        borderBottomColor: '#E2E2E285',
                        borderBottomWidth: 1,
                    }}>
                    <Typography bold style={{fontSize: 17}}>
                        {props.titleModal}
                    </Typography>
                    <TouchableHighlight
                        onPress={props.onClose}
                        style={{
                            borderRadius: 4,
                            width: 24,
                            height: 24,
                            borderColor: 'rgba(134,143,148,0.2)',
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        underlayColor={'#f1f1f1'}></TouchableHighlight>
                </View>

                {props.children}
            </View>
        </Modal>
    );
};

export default BottomModal;
