import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Colors } from '../../constants/Colors';

export default function ProfileDetails() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [isDotVisible, setIsDotVisible] = useState(true);
    const [dotColor, setDotColor] = useState('rgb(0, 255, 0)'); // Initial color green

    // List of RGB colors to cycle through
    const colors = [
        'rgb(0, 255, 0)',  // Green
        'rgb(255, 0, 0)',  // Red
        'rgb(0, 0, 255)',  // Blue
        'rgb(255, 255, 0)', // Yellow
        'rgb(255, 165, 0)', // Orange
        'rgb(128, 0, 128)', // Purple
    ];

    useEffect(() => {
        // Counter to track the current color index
        let colorIndex = 0;

        // Toggle the dot visibility and color every 2 seconds
        const interval = setInterval(() => {
            setIsDotVisible(prev => !prev);
            colorIndex = (colorIndex + 1) % colors.length;
            setDotColor(colors[colorIndex]);
        }, 2000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    if (!isLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.statusContainer}>
                <Text style={[styles.statusLabel, { color: dotColor }]}>ONLINE</Text>
                {isSignedIn && isDotVisible && <View style={[styles.onlineStatus, { backgroundColor: dotColor }]} />}
            </View>

            <View style={styles.profileHeader}>
                {user.imageUrl && (
                    <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
                )}
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Full Name:</Text>
                <Text style={styles.value}>{user.fullName}</Text>
            </View>

            {user.emailAddresses && user.emailAddresses.length > 0 && (
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{user.emailAddresses[0].emailAddress}</Text>
                </View>
            )}

            {user.username && (
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Username:</Text>
                    <Text style={styles.value}>{user.username}</Text>
                </View>
            )}

            {/* <View style={styles.detailRow}>
                <Text style={styles.label}>User ID:</Text>
                <Text style={styles.value}>{user.id}</Text>
            </View> */}
            {/* <View style={styles.detailRow}>
                <Text style={styles.label}>Created At:</Text>
                <Text style={styles.value}>{new Date(user.createdAt).toLocaleDateString()}</Text>
            </View> */}
            <View style={styles.detailRow}>
                <Text style={styles.label}>Last Sign In:</Text>
                <Text style={styles.value}>{new Date(user.lastSignInAt).toLocaleDateString()}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: Colors.WHITE,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 5,
        borderTopColor:"gray",
        borderWidth:2,
        margin:10,
        borderRadius:10
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
    },
    statusLabel: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 5,
    },
    onlineStatus: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        borderWidth: 2,
        borderColor: '#fff',
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100,
    },
    value: {
        flex: 1,
    },
});
