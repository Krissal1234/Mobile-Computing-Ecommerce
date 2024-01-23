import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-ico-material-design";
import { colors } from "../colors";
import { openBrowserAsync } from "expo-web-browser";

const BookingDetails = ({fromPage, backFunction, booking }) => {

  useEffect(() => {
    console.log(booking.item.imageReference)
    console.log(booking);
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
        <Text style={{ fontWeight: "bold" }}>Nike Football Shoes</Text>
        <Text style={{ fontSize: 12, textAlign: "center" }}>
          The Nike Phantom Club GX Junior Firm Ground Football Boots are not for
          the faint hearted. Designed with an elasticated knit collar that wraps
          around the ankle, the two pull tabs make the boots super easy to slip
          in to.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 8,
          flexDirection: "row",
          marginBottom: 16,
        }}
      >
        <View style={{flexDirection: "row"}}>
        <Text>Price</Text>
        <Text style={{ marginLeft: "auto" }}>€{booking.item.price} / hour</Text>
        </View>
        <View style={{flexDirection: "row"}}>
        <Text>{fromPage == "rent"? "Owner" : "Renter"  }</Text>
        <Text style={{ marginLeft: "auto" }}>{fromPage== "rent" ? booking.item.owner.username : booking.renter.username}</Text>
        </View>
      </View>

      <View style={{ backgroundColor: "white", padding: 16, borderRadius: 8 }}>
        <View style={{ flexDirection: "row" }}>
          <Text>From:</Text>
          <Text style={{ marginLeft: "auto" }}>04/12/2023 - 14:00</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>To:</Text>
          <Text style={{ marginLeft: "auto" }}>04/12/2023 - 18:00</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 8,
          marginTop: 16,
        }}
      >
        <Text>Rating</Text>
        <View style={{flexDirection: "row", width: "100%", justifyContent: "space-around", paddingHorizontal: 64, paddingVertical: 16}}>

        <Icon name="thumb-up-button"/>
        <Icon name="thumb-up-button"/>
        <Icon name="thumb-up-button"/>
        <Icon name="thumb-up-button"/>
        <Icon name="thumb-up-button"/>
        </View>
      </View>
    </View>
  );
};

export default BookingDetails;
