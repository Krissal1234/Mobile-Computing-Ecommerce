import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native'
import BookingsCard from '../../Components/BookingsCard'
import BookingDetails from './BookingDetails'
import { OrderController } from '../../Controllers/OrderController'
import { UserContext } from '../../Contexts/UserContext'
import { colors } from '../colors'
import styles from '../styles'

const Bookings = ({ route }) => {
  const {setShowFilter} = useContext(UserContext);
  const [isPastBookings, setIsPastBookings] = useState(true)
  const [isShowingDetails, setIsShowingDetails] = useState(false)
  const [pastbookingOrders, setPastBookingOrders] = useState([]) 
  const [futureBookingOrders, setFutureBookingOrders] = useState([]) // State to store booking orders
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false); // new state variable for loading status
  const [selectedBooking, setSelectedBooking] = useState(null)

  // const from = "";
  useEffect(() => {
    setShowFilter(false);
    const {from} = route.params;
    
    setIsLoading(true); // Start loading
    fetchPastBookingOrders(from);
    fetchFutureBookingOrders(from);
  }, []);



  const fetchFutureBookingOrders = async (from) => {
    try {
      
      console.log("Bookings future fetch");
      let resp = Object;
      if(from == "rent"){
        resp = await OrderController.getRenterFutureBookings(user.user.uid);
      }else if (from == "lease"){
        resp = await OrderController.getLeaserFutureBookings(user.user.uid);
      }
      console.log(resp.data);

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
  const fetchPastBookingOrders = async (from) => {
    try {
      console.log("Bookings past fetch");
      let resp = Object;
      if(from == 'rent'){
        resp = await OrderController.getRenterPastBookings(user.user.uid);
      }else if(from == 'lease'){
        resp = await OrderController.getLeaserPastBookings(user.user.uid);
      }
      console.log(resp.data);
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
    if(bookings.length > 0){
    return bookings.map((order, index) => (
      <BookingsCard 
        key={index}
        title={order.item.title}
        description={order.item.description}
        pricePaid={"€" + order.totalPrice}
        dateFrom={order.rentalPeriod.start.startDate}
        dateTo={order.rentalPeriod.end.endDate}
        imageUri={order.item.imageReference}
        onPressFunc={() => navigateToBookingDetails(setSelectedBooking(order))}
      />
    ))} else {
      return (<>
      <Text style={{textAlign: "center", color: "white"}}>No bookings</Text>
      </>)
    };
  }

  function navigateToBookingDetails(){
    setIsShowingDetails(true)
  }

  function navigateToAllBookings(){
    setIsShowingDetails(false)
  }
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (

        <>
        {!isShowingDetails ? 
        <View style={{backgroundColor: "rgba(0, 22, 51, 1)", height: "100%"}}>
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
        <View style={{padding: 20}}>

        {isPastBookings ? (
          Array.isArray(pastbookingOrders) && renderBookingCards(pastbookingOrders) 
          
          ) : Array.isArray(pastbookingOrders) && renderBookingCards(futureBookingOrders)
        }
        </View>
        
      </View> : <BookingDetails backFunction={navigateToAllBookings} booking={selectedBooking} />
      }
        
        </>
    
  )
}

export default Bookings
