import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Share } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function MenuList() {
    const router = useRouter();
    const { signOut } = useAuth();

    const menuList = [
        {
            id: 1,
            name: "Add Business",
            icon: require("./../../assets/images/add.png"),
            path: "/bussiness/AddBussiness"
        },
        {
            id: 2,
            name: "My Business",
            icon: require("./../../assets/images/chat.png"),
            path: "/bussiness/my-bussiness"
        },
        {
            id: 3,
            name: "Share",
            icon: require("./../../assets/images/send.png"),
            path: "share"
        },
        {
            id: 4,
            name: "Logout",
            icon: require("./../../assets/images/logout.png"),
            path: "logout"
        },
    ];

    const onMenuPress = async (item) => {
        if (item?.path === 'logout') {
            await signOut();
            return;
        } else if (item?.path === 'share') {
            try {
                await Share.share({
                    message: 'Download the app from the Play Store: https://expo.dev/artifacts/eas/9mbVAM2Y8f6orCYf4tsaFf.apk'
                });
            } catch (error) {
                console.error('Error sharing app link: ', error);
            }
            return;
        }
        router.push(item?.path);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={menuList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => onMenuPress(item)}>
                        <Image source={item.icon} style={styles.icon} />
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        flex: 1,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    itemText: {
        fontSize: 18,
    },
});
