import { StatusBar, StyleSheet,Plat } from 'react-native';
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
    verticalFlatList: {
        width: width,
    },
    horizontalFlatList: {
        marginVertical:height*0.05,
    },
    itemPreview:{
        marginHorizontal: width*0.1,
        paddingHorizontal: width*0.03,
        paddingVertical: height*0.03,
        backgroundColor: 'blue',
        justifyContent:'center',
        alignContent:'center',
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


    Detailscontainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#132945',
         // Set your desired background color
      },
      card: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#A2383A',
      },
      detailsimage: {
        width: '80%',
        height: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#A2383A',
        marginBottom: 10,
        alignSelf: 'center',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        color: '#333',
      },
      description: {
        color: '#555',
        textAlign: 'center',
      },
      price: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      switchText: {
        marginRight: 10,
      },
      map: {
        height: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#A2383A',
      },
      detailsinput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
      },
      dateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      backButton: {
       marginBottom: 10, 
       paddingLeft:20,
      },

      
    

})