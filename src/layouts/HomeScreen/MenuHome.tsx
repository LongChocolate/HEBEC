import React, {memo} from 'react';
import {View, ScrollView, FlatList, StyleSheet, TouchableOpacityProps} from 'react-native';
import {ItemMenuCategories} from '../../components/Item/ItemMenuCategories';

interface ItemMenuProps extends TouchableOpacityProps {
    menu: any;
}
const MenuHome = ({menu, ...props}: ItemMenuProps) => {
    const renderItemMenu = ({item, index}) => {
        return (
            <ScrollView key={index} horizontal>
                {item.row.map((itemMenu, itemIndex) => {
                    return (
                        <ItemMenuCategories
                            key={itemIndex}
                            title={itemMenu.title}
                            icon={itemMenu.icon}
                            imageStyle={{width: 60, height: 60}}
                            containerStyle={{
                                alignItems: 'center',
                                width: 86,
                                padding: 8,
                                marginRight: 5,
                            }}
                            {...props}
                        />
                    );
                })}
            </ScrollView>
        );
    };
    return (
        <View style={styles.containerMenuHome}>
            <ScrollView horizontal={true}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={menu}
                    renderItem={renderItemMenu}
                    keyExtractor={(itrm, index) => index.toString()}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerMenuHome: {
        marginTop: 20,

        marginBottom: 40,
    },
});
export default memo(MenuHome);
