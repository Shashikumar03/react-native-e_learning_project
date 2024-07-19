import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

export default function CategoryItem({ category }) {
  return (
    <View onPress={() => alert("hello")} style={styles.itemContainer}>
      <View style={styles.boxShadow}>
        <Image source={{ uri: category.imageUrl }} style={styles.image} />
        <Text style={styles.text}>{category.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxShadow: {
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
  itemContainer: {
    marginRight: 20,
    padding: 5,
    marginStart: 10,
    marginTop: 10,
  },
  image: {
    height: 150,
    width: 180,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
});
