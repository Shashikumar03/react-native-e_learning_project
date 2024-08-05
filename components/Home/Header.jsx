import { View, Text,Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import {Colors} from "../../constants/Colors"
import { Ionicons } from '@expo/vector-icons';
export default function Header() {
    const {user}=useUser()
  // console.log(user.emailAddresses)
   console.log(user?.imageUrl)
   console.log(user.primaryPhoneNumber?.phoneNumber)
   console.log(user.primaryEmailAddress?.emailAddress)
  return (
    <View style={[styles.headerContainer]}>
      {/* <Text>Header</Text> */}
      
      <View style={[styles.userInfoContainer]}>
          <Image style={styles.imageStyle} source={{uri:user?.imageUrl}}/>
          <View style={[styles.userInfoText]}>
            <Text style={[styles.textStyle]}>userName : {user?.fullName}</Text>
            <Text style={[styles.textStyle]}>email : {user?.primaryEmailAddress?.emailAddress}</Text>
          </View>
      </View>
      <View style={styles.searchbarContainer}>
        <View style={ styles.searchConatiner}>
          <Ionicons name="search" size={24} color="black" />
          <TextInput   style={[styles.inputText]} placeholder='Search...'/>
        </View>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  headerContainer:{
    backgroundColor:Colors.PRIMARY,
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:1.5,
    shadowRadius:3,
    elevation:5,
    padding:10
  },
  imageStyle:{
    height:78,
    width:78,
    borderRadius:20,
    // margin:20,
    borderWidth:2,
    // borderColor:'#ccc',
    // overflow:'hidden',

  },
  userInfoContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    // padding:10,
    alignItems:'center',
    marginBottom:20,
    gap:5
    
  },
  userInfoText:{
    borderRadius:10,
    padding:10,
    gap:5,
    flex:1,
    backgroundColor: Colors.USERCOLOR
  },
  borderApply:{
    borderRadius: 10,
    borderWidth: 2, // 2px border width
    borderColor: 'red', // border color
  },
  textStyle:{
    fontSize:14,
    fontWeight:'bold',
    
  },
  inputText:{
    padding:10,

    // backgroundColor:Colors.WHITE
  },
  searchConatiner:{
    flexDirection:'row',
    // marginTop:10
    width:"80%",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    // height:40,
    alignItems: 'center',
    paddingLeft:10,
    backgroundColor:Colors.WHITE
   
  },
  searchbarContainer:{
    // backgroundColor:Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',

  }
})