import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function ExploreBussinessList({ bussinessList }) {
    if (!bussinessList || bussinessList.length === 0) {
        return <Text style={styles.emptyText}>No businesses available.</Text>;
    }
    const router = useRouter()
    return (
        <ScrollView>
            
                <FlatList
                    data={bussinessList}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()} // Use a unique key, fall back to random for safety
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.itemContainer} onPress={()=>router.push("/bussinessdetails/"+item?.id)}>
                            <Image
                                source={{ uri: item?.imageUrl }}
                                style={styles.image}
                            />
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.address}>{item.address}</Text>
                            <Text style={styles.category}>{item.category}</Text>
                        </TouchableOpacity>
                    )}
                />
            
            <View style={{ height: 200, marginTop: 10 }}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        marginTop: 10

    },
    image: {
        height: 200,
        width: '100%',
        resizeMode: "contain"
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
    },
    address: {
        fontSize: 14,
        color: 'gray',
    },
    category: {
        fontSize: 14,
        color: 'gray',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});
