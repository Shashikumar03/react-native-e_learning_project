import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function MenuList() {
    const router=useRouter()

    const menuList = [
        {
            id: 1,
            name: "add",
            icon: require("./../../assets/images/add.png"),
            path:"/bussiness/AddBussiness"
        },
        {
            id: 2,
            name: "chat",
            icon: require("./../../assets/images/chat.png"),
            path:""
        },
        {
            id: 3,
            name: "Share",
            icon: require("./../../assets/images/send.png"),
            path:""
        },
        {
            id: 4,
            name: "logout",
            icon: require("./../../assets/images/logout.png"),
            path:''
        },
    ];
    const onMenuPress=(item)=>{
        router.push(item?.path)

    }

    return (
        <View style={styles.container}>
            <FlatList
                
                data={menuList}
                keyExtractor={(item) => item.id.toString()} // Use a unique key for each item
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={()=>onMenuPress(item)}>
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
        borderWidth:1,
        margin:10,
        borderRadius:10,
        
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        flex:1
        // gap:10,
        
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
