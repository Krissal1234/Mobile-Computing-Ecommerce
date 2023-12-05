import { View, Text, Button } from 'react-native'
import React from 'react'

const SelectLeaseOrRent = ({navigation}) => {
  return (
    <View style={{gap: 8}}>
        <Button title='I want to rent'/>
        <Button title='I want to lease' onPress={() => navigation.navigate("Lease")}/>
        <Button title='Home Page' onPress={() => navigation.navigate("Home")}/>
        <Button title='Login Page' onPress={() => navigation.navigate("Login")}/>
    </View>
  )
}

export default SelectLeaseOrRent