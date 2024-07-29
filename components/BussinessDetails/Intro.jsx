import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
export default function Intro({ bussiness }) {
//   console.log(bussiness);
//   console.log("shashi");
    const router=useRouter();

  return (
    <View style={{marginTop: StatusBar.currentHeight || 0 }}>
        <View style={{
            position:"absolute",
            zIndex:20,
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            width:"100%",
            padding:20
        }}>
        <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="arrow-back-circle" size={24} color="black" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={24} color="black" />
        </View>
      <Image
        source={{ uri: bussiness?.imageUrl}}
        style={styles.image}
        onError={(e) => console.log('Image load error', e.nativeEvent.error)}
      />
      <View style={{
        backgroundColor:Colors.WHITE,
        padding:10,
        paddingRight:20,
        marginTop:-30,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        }}>
            <Text 
            style={{
                fontSize:20,
                fontWeight:"bold"
            }}
            >{bussiness.name}</Text>
            <Text style={{
                fontWeight:Colors.GRAY
            }}>{bussiness.address}</Text>
      </View>
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
    height: 250,
    resizeMode: 'contain',
    marginTop: StatusBar.currentHeight || 0, // Use StatusBar.currentHeight for margin top
  },
});
