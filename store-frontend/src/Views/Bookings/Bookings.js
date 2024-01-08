import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import BookingsCard from '../../Components/BookingsCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BookingDetails from './BookingDetails'
import { ListingsController } from '../../Controllers/ListingsController'
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native'

const Bookings = ({navigation}) => {

  const [isPastBookings, setIsPastBookings] = useState(true)
  const [isShowingDetails, setIsShowingDetails] = useState(false)

  return (

    <>
    {!isShowingDetails ? 
    <View style={{backgroundColor: "rgba(0, 22, 51, 1)"}}>
    <View style={{flexDirection: "row", justifyContent: "space-around", paddingVertical: 8}}>
      <TouchableOpacity onPress={() => setIsPastBookings(true)}>
      <Text style={{
  color: "white", 
  fontWeight: "bold", 
  textDecorationLine: isPastBookings ? 'underline' : 'none'
}}>Past Bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsPastBookings(false)}>
        <Text style={{
          color: "white", 
          fontWeight: "bold",
          textDecorationLine: !isPastBookings ? 'underline' : 'none'}}>Future Bookings</Text>
      </TouchableOpacity>
    </View>
    {isPastBookings ? (
      <ScrollView style={{height: "100%", padding: 12}} contentContainerStyle={{gap: 16}}>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
      <BookingsCard title="Nike Football Shoes" description="past booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg" onPressFunc={navigateToBookingDetails}/>
    </ScrollView>
    ) : <>
    <ScrollView style={{height: "100%", padding: 12}} contentContainerStyle={{gap: 16}}>
    <BookingsCard title="Nike Football Shoes" description="Future booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg"/>
    <BookingsCard title="Nike Football Shoes" description="Future booking of football shoes" pricePaid="€21.50" dateFrom="04/12/2023" dateTo="14/12/2023" imageUri="https://www.sportsdirect.com/images/products/08415840_l_a3.jpg"/>

    </ScrollView>
    </>}
    
  </View> : <BookingDetails backFunction={navigateToAllBookings} />
  }
    
    </>

  )

  function navigateToBookingDetails(){
    setIsShowingDetails(true)
  }

  function navigateToAllBookings(){
    setIsShowingDetails(false)
  }

}



export default Bookings