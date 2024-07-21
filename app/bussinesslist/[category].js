import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from "../../configs/FirebaseConfig"
import { SlideInRight } from 'react-native-reanimated';
export default function BussinesslistByCategory() {
    const navigation=useNavigation()
    const {category}=useLocalSearchParams(); 
    // {category and box[] folder me jo v rahega spelling same rahna chhaiye}

    const[bussinessList,setBussinessList]=useState([])
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:category
        })
        getBussinessList()
    },[]);
    console.log(bussinessList)
    const getBussinessList = async () => {
        try {
          const q = query(collection(db, 'Bussiness'),where('category',"==",category));
        //   catergory hi category name h database me
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setBussinessList(data);
          if(bussinessList){
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching slider data: ", error);
        }
      };
  return (
    <View>
      <Text>{category }</Text>
    </View>
  )
}