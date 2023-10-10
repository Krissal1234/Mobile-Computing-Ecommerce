import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const StoreProfileCard = ({title, description, imageSourceUri, buttonText, onPressFunction}) => {
  return (
    <View style={{padding: 15, backgroundColor: "white", borderRadius: 10, flexDirection: "row"}}>
        <View style={{width: "70%"}}>
      <Text style={{fontWeight: "bold", fontSize: 22, color: "#363636"}}>{title}</Text>
      <Text style={{color: "#363636", marginBottom: 10}}>{description}</Text>
      <TouchableOpacity style={{width: 100 }} onPress={() => onPressFunction()}>
        <View style={{backgroundColor: "#635BFF", alignItems: "center", borderRadius: 10, paddingVertical: 5}}>
            <Text style={{color: "white"}}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
        </View>
        <View style={{alignItems: "center", justifyContent: "center", width: "30%"}}>
            <Image source={{uri: imageSourceUri}} style={{width: 75, height: 75, overflow: "hidden", borderRadius: 500}}/>
        </View>
    </View>
  )
}

export default StoreProfileCard