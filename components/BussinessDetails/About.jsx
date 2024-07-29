import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function About({bussiness}) {
  return (
    <View style={{
        padding:20,

    }}>
      <Text style={{
        fontSize:20,
        fontWeight:"bold"
      }}>About</Text>
      <Text style={{
        color:Colors.GRAY,
        lineHeight:20
      }}>{bussiness?.about}</Text>
    </View>
  )
}