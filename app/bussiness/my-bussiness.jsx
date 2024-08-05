import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';

export default function MyBussiness() {
    const { user } = useUser();
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(businessList)
    useEffect(() => {
        if (user) {
            getUserBusiness();
        }
    }, [user]);

    const getUserBusiness = async () => {
        try {
            setLoading(true);
            const q = query(
                collection(db, "Bussiness"),
                where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
            );
            const querySnapshot = await getDocs(q);
            const businessData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setBusinessList(businessData);
        } catch (error) {
            console.error("Error fetching business data: ", error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.address}</Text>
            <Text>{item.contact}</Text>
            <Text>{item.website}</Text>
            <Text>{item.about}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Business</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : businessList.length === 0 ? (
                <Text>No businesses found.</Text>
            ) : (
                <FlatList
                    data={businessList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
