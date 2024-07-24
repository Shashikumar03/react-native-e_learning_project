import { View, Text, Image, FlatList, StyleSheet,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from "../../configs/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    try {
      const q = query(collection(db, 'Slider'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setSliderList(data);
      if(sliderList){
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching slider data: ", error);
    }
  };
  
  console.log(loading)

  return (
    <View style={styles.main}>
      <Text style={{fontSize:16,fontWeight:"bold",padding:5,paddingLeft:10, }}>#Famous Personalities</Text>
      {loading?<View style={[styles.loadingDiv]}><ActivityIndicator  style={styles.loadingContainer} size="large" color="#0000ff" /></View>:
      <FlatList
        data={sliderList}
        keyExtractor={(item) => item.id}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer,styles.boxShodow]}>
            <Image source={{ uri: item.imageUrl }} style={[styles.image]} />
            <Text style={{textAlign:"center",fontSize:20, fontWeight:'bold',padding:5}}>{item.name}</Text>
          </View>
        )}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  main:{
    borderBottomWidth:3,
    borderColor:"#ddd",
  },
  itemContainer: {
    marginRight: 20,
    padding:5,
    marginStart: 10,
    marginTop:10

  },
  loadingDiv:{
    
    marginTop:50,
  
    

  },
  borderApply:{
    borderRadius: 10,
    borderWidth: 2, // 2px border width
    borderColor: 'green', // border color
  },
  image: {
    height: 150,
    width: 180,
    resizeMode: "contain",
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#ddd',
    // marginBottom: 10,
  },
  boxShodow: {
    padding: 5,
    backgroundColor: '#fff', // Ensure background color for shadow visibility
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
    borderRadius: 10, 
    overflow: 'hidden', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
