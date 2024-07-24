import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from "../../configs/FirebaseConfig";
import BussinessListCard from '../../components/BussinessList/BussinessListCard';
import { Colors } from '../../constants/Colors';

export default function BussinesslistByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams(); 
  // {category and box[] folder me jo v rahega spelling same rahna chhaiye}

  const [bussinessList, setBussinessList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category
    });
    getBussinessList();
  }, []);
  // console.log(bussinessList)

  const getBussinessList = async () => {
    try {
      const q = query(collection(db, 'Bussiness'), where('category', "==", category));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setBussinessList(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching slider data: ", error);
    }
  };

  return (
    <View style={styles.main}>
      {loading ? (
        <View style={styles.loadingDiv}>
          <ActivityIndicator style={styles.loadingContainer} size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={bussinessList}
          keyExtractor={(item) => item.id}
          horizontal={false}
          ListEmptyComponent={<Text style={styles.noDataText}>No data found</Text>}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <BussinessListCard cardList={item} />
            
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.USERCOLOR,
    paddingBottom: 20,
  },
  loadingDiv: {  
    marginTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "pink",
    padding: 10,
    marginVertical: 10,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});
