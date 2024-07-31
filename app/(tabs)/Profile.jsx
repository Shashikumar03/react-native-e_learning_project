import { View, Text } from 'react-native'
import React from 'react'
import ProfileDetails from '../../components/Profile/ProfileDetails'
import MenuList from '../../components/Profile/MenuList'

export default function Profile() {
  return (
    <View>
      <ProfileDetails/>
      <MenuList/>
    </View>
  )
}