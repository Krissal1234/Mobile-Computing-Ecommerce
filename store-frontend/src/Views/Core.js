import { View, Text ,SafeAreaView,Image,TouchableOpacity,ScrollView, StatusBar} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BlurView} from 'expo-blur';
import {colors} from './colors'
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
import profileTransparent from '../../assets/profile.png'
import profileFill from '../../assets/profile_fill_black.png'
import homeTransparent from '../../assets/home_button.png'
import homeFill from '../../assets/home_button_fill.png'
import Equipment from './Equipment/Equipment';
import EquipmentLease from './Lease/EquipmentLease';
import addEquipmentFillIcon from '../../assets/add_report_black.png';
import addEquipmentTransparentIcon from '../../assets/add_report.png';

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
      </Tab.Navigator>
    );
  }
  
function LeaserTabs() {
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
            } else if (route.name === 'Add Equipment') {
              iconName = focused ? addEquipmentFillIcon : addEquipmentTransparentIcon;
            }
            return <Image source={iconName} style={styles.footerIcons} />;
          },
          tabBarLabel:'',
          tabBarItemStyle:styles.footerIconContainer,
          tabBarStyle: styles.coreFooter,
        })}
      >
        <Tab.Screen
          name="Add Equipment"
          component={AddEquipment}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Equipment"
          component={EquipmentLease}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Pitches"
          component={EquipmentLease}
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
  
  const {sportFilter,setSportFilter} = useContext(UserContext);

  const { showFilter} = useContext(UserContext);
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownExpanded(!isDropdownExpanded);
  };

  const selectSport = (sportName) => {
    setSportFilter(sportName);
    toggleDropdown();
  };

  const { accountType } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (

    <SafeAreaView style={styles.container}>

      <BlurView 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: insets.top, // Blur only the non-safe area
                backgroundColor: colors.transDarkBlue
              }}
              intensity={8} // Adjust the intensity as needed
              tint="default"   // 'light', 'dark', or 'default'
      />

      <BlurView style={styles.headerContainer}
      intensity={10}
      tint="dark"
      >
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.headerIcon}>
          <Image source={homeTransparent} style={styles.iconImage} />
        </TouchableOpacity>

        {showFilter && (
            <TouchableOpacity onPress={toggleDropdown} style={styles.filterButton}>
              <Text style={styles.filterText}>{sportFilter}</Text>
            </TouchableOpacity>
          )}
              
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.headerIcon}>
          <Image source={profileTransparent} style={styles.iconImage} />
        </TouchableOpacity>
      </BlurView>
      
      {isDropdownExpanded && (
          <BlurView
          style={styles.fullScreenDropdown}
          intensity={8} // You can adjust the intensity of the blur
          tint="default"   // 'light', 'dark', or 'default'
          >
              <ScrollView contentContainerStyle={styles.dropDownScroll}
              scrollEnabled={true}
              alwaysBounceVertical={true}
              showsVerticalScrollIndicator={false}
              >

                <TouchableOpacity onPress={() => selectSport('No Filter')}>
                  <Text style={styles.dropdownItem}>No Filter</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => selectSport('Football')}>
                  <Text style={styles.dropdownItem}>Football</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => selectSport('Basketball')}>
                  <Text style={styles.dropdownItem}>Basketball</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => selectSport('Tennis')}>
                  <Text style={styles.dropdownItem}>Tennis</Text>
                </TouchableOpacity>

                </ScrollView>
          </BlurView>
        )}
          {accountType === "Renter" ? <RenterTabs /> : <LeaserTabs />}
    </SafeAreaView>

  );
}

export default Core

