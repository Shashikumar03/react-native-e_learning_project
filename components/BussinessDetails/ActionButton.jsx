import { View, Text, FlatList, Image,TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'


export default function ActionButton({bussiness}) {
  // console.log(bussiness)
    const actionButtonMenu=[
      {
        id:1,
        name:"Call",
        url:'tel:'+bussiness?.mobile,
        icon:require("../../assets/images/phone-call.png")
      },
      {
        id:2,
        name:"Location",
        url:"https://www.google.com/maps/place/Raxaul,+Bihar/@27.0035848,84.8223014,16.24z/data=!4m6!3m5!1s0x3993515252feb2fb:0x98334e294cd62157!8m2!3d26.9797677!4d84.8515804!16zL20vMGYyOF81?entry=ttu",
        icon:require("../../assets/images/location.png")
      },
      {
        id:3,
        name:"Share",
        url:"https://www.google.com/maps/place/Raxaul,+Bihar/@27.0035848,84.8223014,16.24z/data=!4m6!3m5!1s0x3993515252feb2fb:0x98334e294cd62157!8m2!3d26.9797677!4d84.8515804!16zL20vMGYyOF81?entry=ttu",
        icon:require("../../assets/images/share.png")
      },
      {
        id:4,
        name:"Website",
        url:bussiness?.website,
        icon:require("../../assets/images/web1.png")
      }
  ]
    // console.log(actionButtonMenu)
    const onPressHandle=(item)=>{
        console.log(item.url)
      if(item.name=='Share'){
        return ;
      }
      Linking.openURL(item.url)
    }
  return (
    
    <View style={{
        backgroundColor:Colors.WHITE,
        padding:20
    }} >
      {/* <Text>{bussiness.name}</Text> */}
        <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{justifyContent:"space-between"}}
        renderItem={({item,Index})=>(
          <TouchableOpacity key={Index} onPress={()=>onPressHandle(item)}>
              <Image source={item?.icon} style={{
                height:40,
                width:40,
              }}/>
              <Text style={{
                textAlign:'center'
              }} >{item.name}
              </Text>
              

              
          </TouchableOpacity>
        )}
        />
    </View>
  )
}