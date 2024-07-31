import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from "../../constants/Colors"
import { Ionicons } from '@expo/vector-icons';
import Category from '../../components/Home/Category';
import { where } from 'firebase/firestore';
// import { Colors } from "../../constants/Colors"
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from "../../configs/FirebaseConfig"
import ExploreBussinessList from '../../components/Explore/ExploreBussinessList';

export default function Explore() {

  const [bussinessList, setBussinessList] = useState([])

  // useEffect(()=>{
  //   getBussinessByCategory()
  // },[])
  const getBussinessByCategory = async (category) => {

    console.log(category)
    try {
      const q = query(collection(db, 'Bussiness'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setBussinessList(data);
      console.log(bussinessList)
      // setLoading(false); // Move setLoading(false) here
    } catch (error) {
      console.error("Error fetching slider data: ", error);
      // setLoading(false); // Ensure loading is set to false even if there's an error
    }


  }
  return (
    <View style={{
      padding: 10,
    }}>
      {/* <Text style={{
        fontWeight: "bold",
        fontSize: 20
      }}>Explore</Text> */}
      <View style={styles.searchConatiner}>
        <Ionicons name="search" size={24} color="black" />
        <TextInput style={[styles.inputText]} placeholder='Search...' />
      </View>
      <Category
        explore={true}
        onCategorySelect={(category) => getBussinessByCategory(category)}
      />
      <ExploreBussinessList bussinessList={bussinessList}/>
    </View>
  )
}

const styles = StyleSheet.create({
  inputText: {
    padding: 8,

    // backgroundColor:Colors.WHITE
  },
  searchConatiner: {
    flexDirection: 'row',
    // marginTop:10
    width: "100%",
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    // height:40,
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: Colors.WHITE

  },
  searchbarContainer: {
    // backgroundColor:Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',

  }
})