import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import { useUser } from '@clerk/clerk-expo'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'

export default function Home() {
  
  return (
    <View>
      {/* header */}
      <Header/>
      <Slider/>
      <Category/>

      {/* slider */}
      {/* category */}
      {/* list */}
    </View>
  )
}