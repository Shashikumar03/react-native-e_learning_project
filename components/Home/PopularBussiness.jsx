import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native-web'
import { Colors } from "../../constants/Colors"
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from "../../configs/FirebaseConfig"
import PopularBussinessCard from './PopularBussinessCard';

export default function PopularBussiness() {
    const [bussinessList, setBussinessList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        try {
            const q = query(collection(db, 'Bussiness'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setBussinessList(data);
            setLoading(false); // Move setLoading(false) here
        } catch (error) {
            console.error("Error fetching slider data: ", error);
            setLoading(false); // Ensure loading is set to false even if there's an error
        }
    };

    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.PRIMARY }}>Popular Bussiness</Text>
            {
                loading ? (
                    <View style={[styles.loadingDiv]}>
                        <ActivityIndicator style={styles.loadingContainer} size="large" color="#0000ff" />
                    </View>
                ) : (
                    <View style={styles.categoryContainer}>
                        <FlatList
                            data={bussinessList}
                            keyExtractor={(item) => item.id}
                            horizontal={true}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => alert(item.name)}>
                                    <PopularBussinessCard bussinessDetails={item} />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 8,
        marginBottom: 1,
    },
    main: {
        borderBottomWidth: 3,
        borderColor: "#ddd",
    },
    itemContainer: {
        marginRight: 1,
        padding: 5,
        marginStart: 10,
        marginTop: 1
    },
    loadingDiv: {
        marginTop: 50,
    },
    borderApply: {
        borderRadius: 10,
        borderWidth: 2, // 2px border width
        borderColor: 'green', // border color
    },
    image: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    boxShodow: {
        padding: 5,
        backgroundColor: '#fff', // Ensure background color for shadow visibility
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
