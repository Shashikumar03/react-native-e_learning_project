import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
export default function Intro({ bussiness }) {
//   console.log(bussiness);
//   console.log("shashi");
    const router=useRouter();

  return (
    <View>
        <View style={{
            position:"absolute",
            zIndex:20,
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between"
        }}>
        <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="arrow-back-circle" size={24} color="black" />
        </TouchableOpacity>
        <FontAwesome6 name="heart" size={24} color="black" />
        </View>
      <Image
        source={{ uri: bussiness.imageUrl}}
        style={styles.image}
        onError={(e) => console.log('Image load error', e.nativeEvent.error)}
      />
      <Text>Shashi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: 'contain',
    marginTop: StatusBar.currentHeight || 0, // Use StatusBar.currentHeight for margin top
  },
});
