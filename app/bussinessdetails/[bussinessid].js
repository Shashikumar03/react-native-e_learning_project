import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text, View, Image, StyleSheet,ActivityIndicator } from "react-native";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../configs/FirebaseConfig";
import { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView } from "react-native-web";
import { Ionicons } from '@expo/vector-icons';
import Intro from "../../components/BussinessDetails/Intro";
// import Intro from "../../components/BussinessDetails/Intro";

export default function BusinessDetails() {
    const { bussinessid } = useLocalSearchParams();
    const navigation = useNavigation();
    const [businessDetails, setBusinessDetails] = useState(null);
    const [statusBarHeight, setStatusBarHeight] = useState(0);

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
        return  <View style={styles.loadingDiv}>
        <ActivityIndicator style={styles.loadingContainer} size="large" color="#0000ff" />
      </View>
    }

    return (
        <View>
            <Intro bussiness={businessDetails}/>
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
        width: "80%",
        height: 300,
        marginBottom: 10,
        resizeMode:''
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
    loadingDiv: {  
        marginTop: 100,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      borderApply:{
        borderRadius: 10,
        borderWidth: 2, // 2px border width
        borderColor: 'green', // border color
        // backgroundColor:""
        // width:"80%"
      },
});