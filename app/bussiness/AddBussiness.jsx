import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/Colors';
import RNPickerSelect from 'react-native-picker-select';

export default function AddBussiness() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null)
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Add New Items",
            headerShown: true
        })
    }, [])
    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        setImage(result?.assets[0].uri)
        console.log(result)
    }
    return (
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
                    style={{
                        padding: 10,
                        fontFamily: 'Outfit-Bold',
                        borderWidth: 1,
                        fontSize: 16,
                        borderColor: Colors.PRIMARY,
                        borderRadius: 10,
                        marginTop: 5
                    }} />
                <TextInput placeholder='address'
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
                    style={{
                        padding: 10,
                        fontFamily: 'Outfit-Bold',
                        borderWidth: 1,
                        fontSize: 16,
                        borderColor: Colors.PRIMARY,
                        borderRadius: 10,
                        marginTop: 5
                    }} />
                <TextInput placeholder='email'
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

                <View>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                    />
                </View>
            </View>

        </View>
    )
}