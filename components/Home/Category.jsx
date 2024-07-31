import { View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native-web'
import { Colors } from "../../constants/Colors"
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from "../../configs/FirebaseConfig"
import CategoryItem from './CategoryItem';
import { useRouter } from 'expo-router';

export default function Category({ explore = false ,onCategorySelect}) {
  const router = useRouter()
  // useState
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCategoryList();

  }, [])
  const getCategoryList = async () => {
    try {
      const q = query(collection(db, 'Category'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategoryList(data);
      if (categoryList) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching slider data: ", error);
    }
  };
  //   console.log(categoryList)
  const  onCategoryPressHandler=(item)=>{
          if(!explore){
            router.push('/bussinesslist/' + item.name)
          }else{
            onCategorySelect(item.name)
          }
  }
  return (
    <View>

      {!explore &&
        <View style={styles.categoryContainer}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.PRIMARY }}>Category</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.PRIMARY }}>view all</Text>
        </View>
      }
      <View style={styles.main}>
        {loading ? <View style={[styles.loadingDiv]}><ActivityIndicator style={styles.loadingContainer} size="large" color="#0000ff" /></View> :
          <FlatList
            data={categoryList}
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onCategoryPressHandler(item)}>
                <CategoryItem category={item} />
              </TouchableOpacity>
            )}
          />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    marginBottom: 1,
    // borderBottomWidth:1,
    // borderColor:"#ddd",

  },
  main: {
    borderBottomWidth: 3,
    borderColor: "#ddd",
  },
  itemContainer: {
    marginRight: 1,
    padding: 5,
    marginStart: 10,
    marginTop: 1

  },
  loadingDiv: {

    marginTop: 50,



  },
  borderApply: {
    borderRadius: 10,
    borderWidth: 2, // 2px border width
    borderColor: 'green', // border color
  },
  image: {
    height: 80,
    width: 100,
    resizeMode: 'contain',
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
})