import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text, View, Image, StyleSheet } from "react-native";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../configs/FirebaseConfig";
import { useEffect, useState } from "react";

export default function BusinessDetails() {
    const { bussinessid } = useLocalSearchParams();
    const navigation = useNavigation();
    const [businessDetails, setBusinessDetails] = useState(null);

    useEffect(() => {
        getBusinessDetailsById();
    }, []);

    const getBusinessDetailsById = async () => {
        try {
            const docRef = doc(db, 'Bussiness', bussinessid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setBusinessDetails(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };

    if (!businessDetails) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: businessDetails.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{businessDetails.name}</Text>
            <Text style={styles.category}>{businessDetails.category}</Text>
            <Text style={styles.about}>{businessDetails.about}</Text>
            <Text style={styles.address}>Address: {businessDetails.address}</Text>
            <Text style={styles.mobile}>Mobile: {businessDetails.mobile}</Text>
            <Text style={styles.website}>Website: {businessDetails.website}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: 128,
        height: 128,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    category: {
        fontSize: 18,
        color: 'grey',
        marginBottom: 10,
    },
    about: {
        fontSize: 16,
        marginBottom: 10,
    },
    address: {
        fontSize: 16,
        marginBottom: 10,
    },
    mobile: {
        fontSize: 16,
        marginBottom: 10,
    },
    website: {
        fontSize: 16,
        color: 'blue',
    },
});
