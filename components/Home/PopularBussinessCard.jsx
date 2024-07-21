import { View, Text,StyleSheet,Image} from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
 const Star= require("../../assets/images/star.png")

export default function PopularBussinessCard({bussinessDetails}) {
  return (
    <View style={[styles.categoryContainer,styles.itemContainer]}>
      <View style={styles.boxShodow}>
        <Image source={{ uri: bussinessDetails.imageUrl }} style={styles.image} />
        <Text style={styles.text}>{bussinessDetails.name}</Text>
        <Text style={{color:Colors.GRAY}}>{bussinessDetails.address}</Text>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:3}}>
            <View style={{flexDirection:"row", gap:5, alignItems:"center"}}>
                <Image source={Star} style={{height:25,width:25}}/>
                <Text style={{fontSize:15, fontWeight:"bold"}}>4.5</Text>
            </View>
            <Text style={
                {marginRight:10, 
                backgroundColor:Colors.PRIMARY,
                 borderRadius:5, 
                 color:Colors.WHITE,
                  padding:5,
                  fontWeight:"bold",
                
                  fontSize:12,
                  textTransform:"uppercase"

                  }}>{bussinessDetails.category}</Text>
        </View>
      </View>
    </View>
  )
}
const styles=StyleSheet.create({
    categoryContainer: {
        flexDirection:"column",
        justifyContent:"space-between",
        padding:5,
        marginBottom:1,
        // borderBottomWidth:1,
        // borderColor:"#ddd",

    },
    itemContainer: {
        marginRight: 20,
        padding: 5,
        marginStart: 10,
        marginTop: 10,
      },
    main:{
        borderBottomWidth:3,
        borderColor:"#ddd",
      },
      itemContainer: {
        marginRight: 1,
        padding:5,
        marginStart: 10,
        marginTop:1
    
      },
      loadingDiv:{
        
        marginTop:50,
      
        
    
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      borderApply:{
        borderRadius: 10,
        borderWidth: 2, // 2px border width
        borderColor: 'green', // border color
      },
      image: {
        height: 150,
        width: 200,
        resizeMode: 'contain', // Ensures the image covers the entire area
        // borderRadius: 10, // Optional: gives rounded corners to the image
        overflow: 'hidden',
        // resizeMode: 'contain',
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