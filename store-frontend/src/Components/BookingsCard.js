import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const BookingsCard = ({imageUri, title, description, pricePaid, dateFrom, dateTo, onPressFunc}) => {
  return (
    <TouchableOpacity onPress={onPressFunc}>
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 16,
          borderColor: "rgba(162, 56, 58, 1)",
          borderWidth: 2,
        }}
      >
        <View style={{ flexDirection: "row", paddingBottom: 8 }}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={{ width: 50, height: 50, paddingRight: 8 }}
          />
          <View>
            <View style={{ width: "93%", paddingLeft: 16 }}>
              <Text>{title}</Text>
              <Text style={{ fontSize: 12 }}>
                {description}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Price Paid</Text>
          <Text style={{ marginLeft: "auto" }}>{pricePaid}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Dates</Text>
          <Text style={{ marginLeft: "auto" }}>{dateFrom} - {dateTo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingsCard;
