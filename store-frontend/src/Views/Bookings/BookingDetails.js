import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-ico-material-design";
import { colors } from "../colors";

const BookingDetails = ({ backFunction, booking }) => {

  useEffect(() => {
    console.log(booking)
  })
  return (
    <View
      style={{
        backgroundColor: "rgba(0, 22, 51, 1)",
        height: "100%",
        padding: 16,
      }}
    >
      <TouchableOpacity onPress={() => backFunction()}>
        <Text style={{ color: "white" }}>Back</Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Image
          source={{
            uri: "https://www.sportsdirect.com/images/products/08415840_l_a3.jpg",
          }}
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontWeight: "bold" }}>{booking.item.title}</Text>
        <Text style={{ fontSize: 12, textAlign: "center" }}>
        {booking.item.description}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <View style={{flexDirection: "row"}}>
        <Text>Price</Text>
        <Text style={{ marginLeft: "auto" }}>€{booking.item.price} / hour</Text>
        </View>
        <View style={{flexDirection: "row"}}>
        <Text>Leaser</Text>
        <Text style={{ marginLeft: "auto" }}>{booking.renter.username}</Text>
        </View>
      </View>

      <View style={{ backgroundColor: "white", padding: 16, borderRadius: 8 }}>
        <View style={{ flexDirection: "row" }}>
          <Text>From</Text>
          <Text style={{ marginLeft: "auto" }}>{booking.rentalPeriod.start.startDate} - {booking.rentalPeriod.start.startTime}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>To</Text>
          <Text style={{ marginLeft: "auto" }}>{booking.rentalPeriod.end.endDate} - {booking.rentalPeriod.end.endTime}</Text>
        </View>
      </View>

      <TouchableOpacity style={{marginTop: 16}} onPress={() => backFunction()}>
        <View style={{paddingVertical: 5, paddingHorizontal: 10, backgroundColor: colors.lightBlue, borderRadius: 100, borderWidth: 2, borderColor: colors.red}}>
          <Text style={{color: "white", textAlign: "center"}}>Back to all bookings</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};

export default BookingDetails;
