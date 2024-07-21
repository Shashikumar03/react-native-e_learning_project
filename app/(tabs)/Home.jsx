import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import { useUser } from '@clerk/clerk-expo'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBussiness from '../../components/Home/PopularBussiness'

export default function Home() {
  
  return (
    <ScrollView>
        {/* header */}
        <Header/>
        {/* slider */}
        <Slider/>
        {/* category */}
        <Category/>
        {/* list */}
        <PopularBussiness/>
    </ScrollView>
  )
}