import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView ,Platform} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/Colors';
import RNPickerSelect from 'react-native-picker-select';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db, storage } from "../../configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function AddBussiness() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null)
    const [categoryList, setCategoryList] = useState([])
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
        // if (errors[field]) {
        //     setErrors({
        //       ...errors,
        //       [field]: ''
        //     });
        //   }
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Add New Items",
            headerShown: true
        })
        getCategoryList()
    }, [])
    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        setImage(result?.assets[0].uri)
        // console.log(result)
    }
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
            setCategoryList(data)
            // setBussinessList(data);
            // setLoading(false);
            // console.log(data)
        } catch (error) {
            console.error("Error fetching slider data: ", error);
        }
    }
    const handleSubmit = () => {
        // if (validateForm()) {
        // const submittedData = JSON.stringify(formData, null, 2);
        // alert('Form Submitted', submittedData);
        // //   setResponse(submittedData);
        // setFormData({
        //     name: '',
        //     address: '',
        //     contact: '',
        //     website: '',
        //     about: '',
        // });
        // }
        onAddNewBusiness()
        
    };
    // const onAddNewBussiness= async()=>{
    //     console.log("submitting")
    //     const fileName= Date.now().toString()+".jpg";
    //     const resp= await fetch(image);
    //     const blob= await resp.blob();
    //     const imageRef= ref(storage,"gs://react-native-project-429517.appspot.com/"+fileName)
    //     console.log(imageRef)
    //     uploadBytes(imageRef,blob).then((snapshot)=>{
    //         console.log("file uploaded successfully")
    //     })
    // }
    const onAddNewBusiness = async () => {
        console.log("Submitting");
        const fileName = Date.now().toString() + ".jpg";
        const response = await fetch(image);
        const blob = await response.blob();
        // console.log(blob)
        
        const imageRef = ref(storage, `/bussiness-app/${fileName}`);
        // console.log(imageRef)
        
        uploadBytes(imageRef, blob).then((snapshot) => {
            console.log("File uploaded successfully");
        }).then((result) => {
            getDownloadURL(imageRef).then(async(downloadUrl)=>{
                console.log(downloadUrl)
            })
            
        }).catch((error) => {
            console.error("Upload failed:", error);
        });
    }

    return (
        <KeyboardAvoidingView behavior='padding'style={[styles.border,styles.container1]} keyboardVerticalOffset={Platform.OS=='ios'?100:0}>
        <View>
            <View style={{
                padding: 20,
                paddingTop: 5
            }}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 20
                }}>Add new Items</Text>
                <Text>Fill all details to Add items</Text>
                <TouchableOpacity onPress={() => onImagePick()} style={{
                    borderColor: Colors.WHITE,
                    width: "100%"

                    // alignItems: 'center',
                    // justifyContent: 'center',



                }}>
                    {
                        !image ? <Image source={require("./../../assets/images/upload.png")}
                            style={{
                                height: 150,
                                width: 150,
                                borderRadius: 10,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 3,
                                elevation: 5,
                                // backgroundColor: Colors.WHITE,
                                // borderWidth: 2,
                                // borderColor: "black"
                            }} /> : <Image source={{ uri: image }}
                                style={{
                                    height: 150,
                                    width: 150,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: "black",
                                    resizeMode: "cover",
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 3,
                                    elevation: 5,
                                    // backgroundColor: Colors.WHITE,
                                }} />
                    }
                </TouchableOpacity>
                
                    <TextInput placeholder='name'
                        value={formData.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                        style={{
                            padding: 10,
                            fontFamily: 'bold',
                            borderWidth: 1,
                            fontSize: 16,
                            borderColor: Colors.PRIMARY,
                            borderRadius: 10,
                            marginTop: 5
                        }} />
                    <TextInput placeholder='address'
                        value={formData.address}
                        onChangeText={(value) => handleInputChange('address', value)}
                        style={{
                            padding: 10,
                            fontFamily: 'Outfit-Bold',
                            borderWidth: 1,
                            fontSize: 16,
                            borderColor: Colors.PRIMARY,
                            borderRadius: 10,
                            marginTop: 5
                        }} />
                    <TextInput placeholder='contact'
                        value={formData.contact}
                        keyboardType='phone-pad'
                        onChangeText={(value) => handleInputChange('contact', value)}
                        style={{
                            padding: 10,
                            fontFamily: 'Outfit-Bold',
                            borderWidth: 1,
                            fontSize: 16,
                            borderColor: Colors.PRIMARY,
                            borderRadius: 10,
                            marginTop: 5
                        }} />
                    <TextInput placeholder='website'
                        value={formData.website}
                        onChangeText={(value) => handleInputChange('website', value)}
                        style={{
                            padding: 10,
                            fontFamily: 'Outfit-Bold',
                            borderWidth: 1,
                            fontSize: 16,
                            borderColor: Colors.PRIMARY,
                            borderRadius: 10,
                            marginTop: 5
                        }} />
                    <TextInput placeholder='about'
                        value={formData.about}
                        onChangeText={(value) => handleInputChange('about', value)}
                        multiline
                        numberOfLines={3}
                        style={{
                            padding: 10,
                            fontFamily: 'Outfit-Bold',
                            borderWidth: 1,
                            fontSize: 16,
                            borderColor: Colors.PRIMARY,
                            borderRadius: 10,
                            marginTop: 5
                        }} />

                    <View style={{
                        // padding: 2,
                        // fontFamily: 'Outfit-Bold',
                        // borderWidth: 1,
                        // fontSize: ,
                        borderColor: Colors.PRIMARY,
                        borderRadius: 10,
                        marginTop: 5,
                        // gap:10

                    }}>
                        <View   style={{
                                borderWidth:1,
                                borderColor:Colors.PRIMARY,
                                borderRadius:10
                            }}>
                        <RNPickerSelect
                            onValueChange={(value) => console.log(value)}
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
    )
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
    border:{
        borderWidth: 2,
       borderColor: 'green',
       borderStyle: 'solid',
       borderRadius:10,
       marginBottom:10
     },
     container1: {
        // flex: 1,
        padding: 20,
        // paddingBottom: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        
      },

})