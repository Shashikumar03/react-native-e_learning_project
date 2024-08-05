import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/Colors';
import RNPickerSelect from 'react-native-picker-select';
import { collection, query, getDocs, setDoc, doc } from 'firebase/firestore';
import { db, storage } from "../../configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddBussiness() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState();
    const { user } = useUser();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact: '',
        website: '',
        about: '',
    });

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Add New Items",
            headerShown: true
        });
        getCategoryList();
    }, []);

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        setImage(result?.assets[0]?.uri);
    };

    const getCategoryList = async () => {
        try {
            const q = query(collection(db, 'Category'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                label: doc.data().name,
                value: doc.data().name,
                ...doc.data()
            }));
            setCategoryList(data);
        } catch (error) {
            console.error("Error fetching slider data: ", error);
        }
    };

    const handleSubmit = () => {
        const submittedData = JSON.stringify(formData, null, 2);
        // alert('Form Submitting', submittedData);

        setFormData({
            name: '',
            address: '',
            contact: '',
            website: '',
            about: '',
        });

        onAddNewBusiness();
    };

    const onAddNewBusiness = async () => {
        try {
            console.log("Submitting");
            const fileName = Date.now().toString() + ".jpg";
            const response = await fetch(image);
            const blob = await response.blob();

            const imageRef = ref(storage, `/business-app/${fileName}`);

            await uploadBytes(imageRef, blob);
            console.log("File uploaded successfully");

            const downloadUrl = await getDownloadURL(imageRef);
            console.log("File available at", downloadUrl);
            ToastAndroid.show("Added successfully",ToastAndroid.LONG,ToastAndroid.CENTER)

            await saveBusinessDetails(downloadUrl);
            setImage(null);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const saveBusinessDetails = async (downloadUrl) => {
        try {
            const newBusinessDocRef = doc(collection(db, "Bussiness"));
            await setDoc(newBusinessDocRef, {
                ...formData,
                category: category,
                imageUrl: downloadUrl,
                userEmail:user?.primaryEmailAddress?.emailAddress
                 
            });
        } catch (error) {
            console.error("Error saving business details:", error);
        }
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={[styles.border, styles.container1]} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
            <View>
                <View style={{ padding: 20, paddingTop: 5 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Add new Items</Text>
                    <Text>Fill all details to Add items</Text>
                    <TouchableOpacity onPress={() => onImagePick()} style={{ borderColor: Colors.WHITE, width: "100%" }}>
                        {
                            !image ? <Image source={require("./../../assets/images/upload.png")}
                                style={styles.imageStyle} /> : <Image source={{ uri: image }}
                                    style={[styles.imageStyle, styles.imagePicked]} />
                        }
                    </TouchableOpacity>

                    <TextInput placeholder='name'
                        value={formData.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                        style={styles.input} />
                    <TextInput placeholder='address'
                        value={formData.address}
                        onChangeText={(value) => handleInputChange('address', value)}
                        style={styles.input} />
                    <TextInput placeholder='contact'
                        value={formData.contact}
                        keyboardType='phone-pad'
                        onChangeText={(value) => handleInputChange('contact', value)}
                        style={styles.input} />
                    <TextInput placeholder='website'
                        value={formData.website}
                        onChangeText={(value) => handleInputChange('website', value)}
                        style={styles.input} />
                    <TextInput placeholder='about'
                        value={formData.about}
                        onChangeText={(value) => handleInputChange('about', value)}
                        multiline
                        numberOfLines={3}
                        style={styles.input} />

                    <View style={styles.pickerContainer}>
                        <View style={styles.picker}>
                            <RNPickerSelect
                                onValueChange={(value) => setCategory(value)}
                                items={categoryList}
                            />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    border: {
        borderWidth: 2,
        borderColor: 'green',
        borderStyle: 'solid',
        borderRadius: 10,
        marginBottom: 10
    },
    container1: {
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    imageStyle: {
        height: 150,
        width: 150,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
    },
    imagePicked: {
        borderWidth: 2,
        borderColor: "black",
        resizeMode: "cover",
    },
    input: {
        padding: 10,
        fontFamily: 'bold',
        borderWidth: 1,
        fontSize: 16,
        borderColor: Colors.PRIMARY,
        borderRadius: 10,
        marginTop: 5
    },
    pickerContainer: {
        borderColor: Colors.PRIMARY,
        borderRadius: 10,
        marginTop: 5,
    },
    picker: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 10
    },
});
