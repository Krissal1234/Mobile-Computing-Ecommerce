import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native'
import BookingsCard from '../../Components/BookingsCard'
import BookingDetails from './BookingDetails'
import { OrderController } from '../../Controllers/OrderController'
import { UserContext } from '../../Contexts/UserContext'

const Bookings = ({ navigation }) => {
  const [isPastBookings, setIsPastBookings] = useState(true)
  const [isShowingDetails, setIsShowingDetails] = useState(false)
  const [pastbookingOrders, setPastBookingOrders] = useState([]) 
  const [futureBookingOrders, setFutureBookingOrders] = useState([]) // State to store booking orders
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false); // new state variable for loading status

  useEffect(() => {
    setIsLoading(true); // Start loading
    fetchPastBookingOrders();
    fetchFutureBookingOrders();
  }, []);



  const fetchFutureBookingOrders = async () => {
    try {
      console.log("Bookings past fetch")
      const resp = await OrderController.getFutureBookings(user.user.uid);
      console.log(user.user.uid);
      if(resp.success){
        setFutureBookingOrders(resp.data);
      }else{
        console.error(resp.message);
      }

    } catch (error) {
      console.error('Failed to fetch future booking orders:', error);
    }finally {
      setIsLoading(false); // Stop loading
    }
  }
  const fetchPastBookingOrders = async () => {
    try {
      console.log("Bookings future fetch")
      const resp = await OrderController.getPastBookings(user.user.uid);
      console.log(user.user.uid);
      if(resp.success){
        setPastBookingOrders(resp.data);
      }else{
        console.error(resp.message);
      }

    } catch (error) {
      console.error('Failed to fetch past booking orders:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  }


  const renderBookingCards = (bookings) => {
    return bookings.map((order, index) => (
      <BookingsCard 
        key={index}
        title={order.item.title}
        description={order.item.description}
        pricePaid={order.totalPrice}
        dateFrom={order.rentalPeriod.start.startDate}
        dateTo={order.rentalPeriod.end.endDate}
        imageUri={order.item.imageReference}
        onPressFunc={navigateToBookingDetails}
      />
    ));
  }

  function navigateToBookingDetails(){
    setIsShowingDetails(true)
  }

  function navigateToAllBookings(){
    setIsShowingDetails(false)
  }
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
            Array.isArray(pastbookingOrders) && renderBookingCards(pastbookingOrders) 

        ) : Array.isArray(pastbookingOrders) && renderBookingCards(futureBookingOrders)
        }
        
      </View> : <BookingDetails backFunction={navigateToAllBookings} />
      }
        
        </>
    
  )
}

export default Bookings
