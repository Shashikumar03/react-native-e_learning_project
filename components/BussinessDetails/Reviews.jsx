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
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString();
            const formattedTime = currentDate.toLocaleTimeString();

            const docRef = doc(db, 'Bussiness', bussiness?.id);
            await updateDoc(docRef, {
                reviews: arrayUnion({
                    rating: rating,
                    comment: userInput,
                    userName: user?.fullName,
                    userImage: user?.imageUrl,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    date: formattedDate,
                    time: formattedTime,
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
                    bussiness?.reviews?.map((item, index) => (
                        <View key={index} style={styles.reviewContainer}>
                            <View>
                                <Image source={{ uri: item.userImage }}
                                    style={styles.userImage}
                                />
                            </View>
                            <View style={styles.reviewTextContainer}>
                                <Text style={styles.userName}>{item?.userName}</Text>
                                <Rating
                                    imageSize={15}
                                    readonly
                                    startingValue={item?.rating}
                                    style={{alignSelf:"flex-start"}}
                                />
                                <Text>{item?.comment}</Text>
                                <Text style={styles.timestamp}>{item?.date} at {item?.time}</Text>
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
    reviewContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        borderColor: Colors.GRAY,
        borderWidth: 0.5,
        marginTop: 6,
        borderRadius: 10,
        padding: 10,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 20,
        marginTop: 5
    },
    reviewTextContainer: {
        marginLeft: 10
    },
    userName: {
        fontWeight: 'bold'
    },
    timestamp: {
        fontSize: 10,
        color: Colors.GRAY,
        marginTop: 5
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
