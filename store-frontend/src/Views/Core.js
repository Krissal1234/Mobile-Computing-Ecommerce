import { View, Text ,SafeAreaView,Image} from 'react-native'
import React, { useContext, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Basket from './Basket/Basket';
import Bookings from './Bookings/Bookings';
import RentEquipment from './Rent/Equipment';
import RentPitches from './Rent/Pitches';
import Icon from 'react-native-ico-material-design';
import AddEquipment from './AddEquipment/AddEquipment';
import { UserContext } from '../Contexts/UserContext';
import styles from './styles';
import equipmentTransparentIcon from '../../assets/equipment_transparent.png'
import equipmentFillIcon from '../../assets/equipment_fill_black.png'
import basketFillIcon from '../../assets/basket_fill_black.png'
import basketTransparentIcon from '../../assets/basket.png'
import bookingsFillIcon from '../../assets/bookings_fill_black.png'
import bookingsTransparentIcon from '../../assets/bookings.png'
import pitchFillIcon from '../../assets/pitch_fill_black.png'
import pitchTransparentIcon from '../../assets/pitch.png'

const Tab = createBottomTabNavigator();

function RenterTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Pitches') {
              iconName = focused ? pitchFillIcon : pitchTransparentIcon;
            } else if (route.name === 'Equipment') {
              iconName = focused ? equipmentFillIcon : equipmentTransparentIcon;
            } else if (route.name === 'Bookings') {
              iconName = focused ? bookingsFillIcon : bookingsTransparentIcon;
            } else if (route.name === 'Basket') {
              iconName = focused ? basketFillIcon : basketTransparentIcon;
            }
            return <Image source={iconName} style={styles.footerIcons} />;
          },
          tabBarLabel:'',
          tabBarItemStyle:styles.footerIconContainer,
          tabBarStyle: styles.coreFooter,
        })}
      >
      <Tab.Screen
          name="Equipment"
          component={RentEquipment}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Pitches"
          component={RentPitches}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Basket"
          component={Basket}
          options={{ headerShown: false }}
        />              
      </Tab.Navigator>
    );
  }
  
function LeaserTabs() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "settings-cogwheel-button";
            return <Icon name={iconName} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {backgroundColor: "rgba(0, 22, 51, 1)"}
        })}
      >
        <Tab.Screen
          name="Add Equipment"
          component={AddEquipment}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Equipment"
          component={Equipment}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Pitches"
          component={Pitches}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
  );
}

const Core = () => {
  const { accountType } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      {accountType === "Renter" ? <RenterTabs /> : <LeaserTabs />}
    </SafeAreaView>
  );
}

export default Core

