import { StatusBar, StyleSheet} from 'react-native';
import {colors} from './colors'
import { Dimensions } from 'react-native';

const{width,height} = Dimensions.get('window');

//heights that affect other elements are listed here
const footerHeight = height*0.08;

export default StyleSheet.create({
    container: {
        flex: 1,
        height:height,
        width: width, 
        backgroundColor: colors.darkBlue,
        ...Platform.select({
            ios: {  
            },
            android: {
                paddingTop:StatusBar.currentHeight,
            },
          }),
          
    },
    androidFooterFix:{
      ...Platform.select({
        ios: {  
        },
        android: {
          paddingBottom:height*0.1,
        },
      }),
    },
    keyboardContainer:{
        width:width,
        alignItems:'center',
        justifyContent:'center'

    },
    
    logo: {
        height: height*0.3,
        width: width*0.4,
        paddingVertical:height*0.19,
        paddingHorizontal:width*0.41,
        alignSelf: "center",
        marginBottom:height*0.05,
        marginTop:height*0.02,
    },
    input: {
        backgroundColor: colors.white,
        width:width*0.8,
        marginTop: height*0.02,
        paddingVertical: height*0.02,
        paddingHorizontal: width*0.05,
        borderRadius: height*0.035,
        borderWidth:width*0.01,
        borderColor:colors.red,
        alignItems: "center",
        justifyContent: 'center',
    },

    addEquipmentInput: {
      backgroundColor: colors.white,
      width:width*0.7,
      marginTop: height*0.02,
      paddingVertical: height*0.02,
      paddingHorizontal: width*0.05,
      borderRadius: height*0.035,
      borderWidth:width*0.01,
      borderColor:colors.red,
      alignItems: "center",
      justifyContent: 'center',
  },
    button: {
        backgroundColor: colors.white,
        width:width*0.8,
        marginTop: height*0.05,
        paddingVertical: height*0.02,
        borderRadius: height*0.035,
        borderWidth:width*0.01,
        borderColor:colors.red,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: colors.black,
        fontSize: width*0.05,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: height*0.02
    },
    footerText: {
        fontSize: width*0.045,
        color: colors.white
    },
    footerLink: {
        color: colors.lightBlue,
        fontWeight: "bold",
        fontSize: width*0.047
    },
    coreFooter:{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.darkBlue,
        paddingBottom:0,
        height:footerHeight,
        justifyContent:'center',
        alignItems:'center',
    },
    footerIcons: {
        marginTop:height*0.03,
        height: height*0.055,
        resizeMode: 'contain',
    },
    footerIconContainer:{
        justifyContent:'center',
    },
    headerContainer: {
        width: width,
        height:height*0.09,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.transDarkBlue,
        borderBottomWidth: width*0.01,
        alignSelf:'center',
        borderBottomColor: colors.white,
    },
    headerIcon: {
        flex: 1,
        flexGrow:0,
        flexShrink:1,
        flexBasis:width*0.2,
        alignItems: 'center',
        justifyContent: 'center',
        padding:width*0.05,
    },
    iconButton: {
        padding:width*0.2
    },
    iconImage: {
        height: height*0.045,
        resizeMode: 'contain',
        justifyContent:'center',
        alignContent:'center',
    },
    filterButton: {
        flexGrow:3,
        flexShrink:0,
        backgroundColor: colors.transWhite,
        borderRadius: height*0.025,
        alignItems:'center',
        paddingHorizontal:width*0.01,
        paddingVertical: height*0.01,
        borderWidth: 1,
        borderColor: colors.semiTransWhite,
    },
    filterText: {
        color: colors.white,
        fontSize: width*0.04,
        textAlign:'center',
    },
    fullScreenDropdown: {
        position: 'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0,
        backgroundColor:colors.semiTransDarkBlue,
        zIndex: 1000,
        justifyContent: 'start',
        alignItems: 'center',
    },
    dropDownScroll:{
        paddingTop:height*0.06,
    },
    dropdownItem: {
        fontSize: width*0.05,
        fontWeight:'480',
        color: colors.white,
        alignSelf:'center',
        paddingVertical:height*0.015,
    },
    filteredScrollView:{
      height:height,
      flexDirection: 'row',
      marginTop:width*0.1,
      flexWrap:'wrap',
      justifyContent: 'space-evenly'
    },
    verticalFlatList: {
      width: width,
    },
    horizontalFlatList: {
      marginVertical:height*0.05,
    },
    itemPreview:{
      marginVertical:height*0.01,
        marginHorizontal: width*0.02,
        width:width*0.4,
        height:height*0.19,
        backgroundColor: colors.white,
        justifyContent:'center',
        alignContent:'center',
        resizeMode:'contain',
        borderRadius: height*0.035,
        borderWidth: 3,
        borderColor: colors.red,
        overflow:'hidden',
        
    },
    itemImg:{
        height:height*0.19,
        width:width*0.19,
        paddingHorizontal:width*0.21,
        paddingVertical:height*0.1,
        marginHorizontal:width*0.05,

    },
    testStyle:{
        marginHorizontal:width*0.1,
    },
    card: {
        minHeight : height*0.085,
        padding: width*0.05,
        marginHorizontal:width*0.1,
        marginVertical: height*0.01,
        backgroundColor: colors.white,
        borderRadius: height*0.035,
        borderWidth: 3,
        borderColor: colors.red,
        overflow:'hidden',
        alignContent:'center',
        justifyContent:'center',
    },
    detailsImage: {
      width: width* 0.70,
      height: height* 0.25,
      borderRadius: height*0.035,
      borderWidth: 3,
      borderColor: colors.red,
      marginBottom: height*0.02,
      alignSelf: 'center',
    },
    title: {
      fontSize: width*0.05,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.black,
    },
    descriptionContainer:{
        alignItems:'center',
    },
    description: {
      color: colors.black,
      textAlign: 'center',
      width: width*0.7,
      marginTop:height*0.01,
    },
    priceContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    price: {
      fontSize: width*0.05,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: width*0.05,
      fontWeight: 'bold',
      marginBottom: height*0.01,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    switchText: {
      marginRight: height*0.02,
    },
    map: {
      height: height*0.30,
      borderRadius: height*0.035,
      borderWidth: width*0.005,
      borderColor: colors.red,
    },
    dateTitle: {
      fontSize: width*0.05,
      fontWeight: 'bold',
      marginBottom: height*0.01,
      textAlign: 'center',
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        
      },
      
      deleteButton: {
        marginBottom: height*0.01, 
        paddingLeft: width*0.07,
      },
      
    backButton: {
      marginBottom: height*0.01, 
      paddingLeft: width*0.05,
    },
    calendarTheme:{
        calendarBackground:colors.white,
        textSectionTitleColor: colors.black,
        todayTextColor: colors.red,
        dayTextColor: colors.black,
        arrowColor: colors.lightBlue,
        disabledArrowColor: colors.mutedBlue,
        monthTextColor: colors.black,
        indicatorColor: colors.black,
        textDayFontWeight: 'bold',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: 'bold',
    },
    cevron :{
        width:width*0.08,
        resizeMode:'contain',
        marginLeft:width*0.04,
    },
    timeContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    timeDropdown:{
      ...Platform.select({
        ios: {  
        },
        android: {
          height:height*0.2,
        },
      }),

    },
    timeItem:{
      ...Platform.select({
        ios: {  
        },
        android: {
          alignSelf:'center',
          marginVertical:height*0.01,
        },
      }),
      
    },
    timeItemText:{
      ...Platform.select({
        ios: {  
        },
        android: {
          fontSize:20,
        },
      }),
    },
    basket:{
        height:height*0.05,
        width:width*0.08,
        resizeMode:'contain',
        marginLeft:width*0.04,
    },
    titleBasket: {
        fontSize: width*0.08,
        fontWeight: '450',
        textAlign: 'center',
        color: colors.black,
      },
      modalOpenButton: {
        backgroundColor: 'blue',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
      },
      modalTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalCloseButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
      },

      editModeButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        alignItems: 'center', 
        
      },
      
      modalCloseButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      editButton: {
        backgroundColor: colors.white,
        width: width * 0.4, // Smaller width, e.g., 40% of the screen width
        marginTop: height * 0.02, // Reduced margin-top
        paddingVertical: height * 0.01, // Smaller padding
        borderRadius: height * 0.02, // Smaller border-radius
        borderWidth: width * 0.005, // Smaller border-width
        borderColor: colors.red,
        alignItems: "center",
        justifyContent: 'center'
    },
    
    addButton: {
      backgroundColor: colors.white,
      width: width * 0.4, // Smaller width, e.g., 40% of the screen width
      marginTop: height * 0.02, // Reduced margin-top
      paddingVertical: height * 0.01, // Smaller padding
      borderRadius: height * 0.02, // Smaller border-radius
      borderWidth: width * 0.005, // Smaller border-width
      borderColor: colors.red,
      alignItems: "center",
      justifyContent: 'center'
    }
    
})