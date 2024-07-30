import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Image } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/Colors';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from "../../configs/FirebaseConfig";
import { useUser } from '@clerk/clerk-expo';

export default function Reviews({ bussiness }) {
    const [rating, setRating] = useState(5);
    const [userInput, setUserInput] = useState('');
    const { user } = useUser();

    const handleSubmit = async () => {
        if (!bussiness || !bussiness.id) {
            console.error('Bussiness data is missing or invalid.');
            return;
        }

        try {
            const docRef = doc(db, 'Bussiness', bussiness?.id);
            await updateDoc(docRef, {
                reviews: arrayUnion({
                    rating: rating,
                    comment: userInput,
                    userName: user?.fullName,
                    userImage: user?.imageUrl,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                })
            });
            ToastAndroid.show('Review submitted successfully!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            setUserInput(''); // Clear input field after submission
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reviews</Text>
            <View>
                {
                    bussiness?.reviews.map((item, index) => (
                        <View style={{
                            display:"flex",
                            flexDirection:"row",
                            gap:4,
                            borderColor:Colors.GRAY,
                            borderWidth:0.5,
                            marginTop:6,
                            borderRadius:10,
                            padding:10,
                            // justifyContent:"center",
                            alignItems:"center"
                        }}>
                            <View>
                                <Image source={{ uri: item.userImage }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 20
                                    }}
                                />
                            </View>
                            <View>
                                <Text>{item.userName}</Text>
                                <Rating
                                    imageSize={15}
                                    ratingCount={item.rating}
                                />
                                <Text>{item.rating}</Text>
                                <Text>{item.comment}</Text>
                            </View>

                        </View>
                    ))
                }
            </View>
            <View>

                <AirbnbRating
                    onFinishRating={setRating}
                    size={25}
                />
                <TextInput
                    placeholder='Write your comment'
                    numberOfLines={4}
                    onChangeText={setUserInput}
                    value={userInput}
                    style={styles.textInput}
                    multiline={true}
                />
                <TouchableOpacity
                    disabled={!userInput.trim()}
                    style={[
                        styles.submitButton,
                        { backgroundColor: userInput.trim() ? Colors.PRIMARY : Colors.GRAY }
                    ]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: Colors.WHITE
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.GRAY,
        textAlignVertical: 'top',
        marginVertical: 10
    },
    submitButton: {
        padding: 10,
        borderRadius: 8,
        marginTop: 5
    },
    submitText: {
        color: Colors.WHITE,
        textAlign: 'center'
    }
});
