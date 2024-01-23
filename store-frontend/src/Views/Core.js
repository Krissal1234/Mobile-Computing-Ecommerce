import { View, Text ,SafeAreaView,Image,TouchableOpacity,FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useContext, useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BlurView} from 'expo-blur';
import {colors} from './colors'
import Bookings from './Bookings/Bookings';
import RentEquipment from './Rent/Equipment';
import RentFacilities from './Rent/Facilities';
import AddEquipment from './AddEquipment/AddEquipment';
import { UserContext } from '../Contexts/UserContext';
import styles from './styles';
import equipmentTransparentIcon from '../../assets/equipment_transparent.png'
import equipmentFillIcon from '../../assets/equipment_fill_black.png'
import bookingsFillIcon from '../../assets/bookings_fill_black.png'
import bookingsTransparentIcon from '../../assets/bookings.png'
import pitchFillIcon from '../../assets/pitch_fill_black.png'
import pitchTransparentIcon from '../../assets/pitch.png'
import profileTransparent from '../../assets/logo.png'
import profileFill from '../../assets/profile_fill_black.png'
import homeTransparent from '../../assets/home_button.png'
import homeFill from '../../assets/home_button_fill.png'
import EquipmentLease from './Lease/EquipmentLease';
import PitchesLease from './Lease/FacilityLease';
import addEquipmentFillIcon from '../../assets/add_report_black.png';
import addEquipmentTransparentIcon from '../../assets/add_report.png';
import { ListingsController } from '../Controllers/ListingsController';
import ChoiceScreen from './AddEquipment/ChoiceScreen';

const Tab = createBottomTabNavigator();


function RenterTabs(navigation ) {
  const { setShowFilter } = useContext(UserContext);

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Facilities') {
              iconName = focused ? pitchFillIcon : pitchTransparentIcon;
            } else if (route.name === 'EquipmentStack') {
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
          name="EquipmentStack"
          component={RentEquipment}
          options={{ headerShown: false }}
          listeners={{
            focus: () => setShowFilter(true),
          }}
        />
        <Tab.Screen
          name="Facilities"
          component={RentFacilities}
          options={{ headerShown: false }}
          listeners={{
            focus: () => setShowFilter(true),
          }}
        />
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          options={{ headerShown: false }}
          initialParams={{from:'rent'}}
          listeners={{
            focus: () => setShowFilter(false),
          }}
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
            if (route.name === 'Facilities') {
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
          component={ChoiceScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Equipment"
          component={EquipmentLease}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Facilities"
          component={PitchesLease}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          options={{ headerShown: false }}
          initialParams={{ from: 'lease' }}
        />
      </Tab.Navigator>
  );
}

const Core = () => {
  
  const {sportFilter,setSportFilter} = useContext(UserContext);

  const { showFilter} = useContext(UserContext);
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

  const [sports, setSports] = useState([]);
  const [loadingSports, setLoadingSports] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownExpanded(!isDropdownExpanded);
  };

  const selectSport = (sportName) => {
    setSportFilter(sportName);
    toggleDropdown();
  };

  useEffect(() => {
    const fetchSports = async () => {
      try {
        setLoadingSports(true);
        const sportsData = await ListingsController.getAllSports();
        setSports(["All Sports", ...sportsData.data]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSports(false);
      }
    };

    fetchSports();
  }, []);

  const renderSportItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectSport(item)}>
      <Text style={styles.dropdownItem}>{item}</Text>
    </TouchableOpacity>
  );

  const { accountType } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (

    <SafeAreaView style={styles.coreContainer}>

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
                  
        <TouchableOpacity style={styles.headerIcon}>
              <Image source={profileTransparent} style={{...styles.iconImage, width: 50, height: 50}} />
        </TouchableOpacity>
      
      </BlurView>
        
      {isDropdownExpanded && !loadingSports && (
        <BlurView
          style={styles.fullScreenDropdown}
          intensity={8}
          tint="default"
        >
          <FlatList
            contentContainerStyle={styles.dropDownScroll}
            data={sports}
            renderItem={renderSportItem}
            keyExtractor={(item, index) => `sport-${index}`}
          />
        </BlurView>
      )}
            
      {accountType === "Renter" ? <RenterTabs /> : <LeaserTabs />}

    </SafeAreaView>

  );
}

export default Core

