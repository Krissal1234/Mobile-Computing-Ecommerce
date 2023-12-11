import { StyleSheet } from 'react-native';
import {colors} from './colors'
export default StyleSheet.create({
    container: {
        flex: 1,
        height:'100%',
        width: '100%',
        backgroundColor: colors.darkBlue,
    },
    keyboardContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'

    },
    title: {
    },
    logo: {
        height: '30%',
        width: '30%',
        padding:'40%',
        alignSelf: "center",
        marginBottom:'10%',
        marginTop:'5%',
    },
    input: {
        backgroundColor: colors.white,
        width:'80%',
        marginTop: '5%',
        paddingVertical: '5%',
        borderRadius: '25%',
        borderWidth:'3%',
        borderColor:colors.red,
        alignItems: "center",
        justifyContent: 'center',
        padding:'5%',
    },
    button: {
        backgroundColor: colors.white,
        width:'80%',
        marginTop: '10%',
        paddingVertical: '5%',
        borderRadius: '25%',
        borderWidth:'3%',
        borderColor:colors.red,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: colors.black,
        fontSize: '18%',
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: '5%'
    },
    footerText: {
        fontSize: '16%',
        color: colors.white
    },
    footerLink: {
        color: colors.lightBlue,
        fontWeight: "bold",
        fontSize: '16%'
    },
    coreFooter:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.darkBlue,
        paddingBottom:0,
        height:'9%',
        justifyContent:'center',
        alignItems:'center',
    },
    footerIcons: {
        marginTop:'20%',
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    footerIconContainer:{
        justifyContent:'center',
    },
    headerContainer: {
        width: '106%',
        height:'9%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.transDarkBlue,
        paddingTop:'2%',
        marginTop:'-3%',
        borderWidth: '3%',
        alignSelf:'center',
        borderColor:'transparent',
        borderBottomColor: colors.white,
    },
    headerIcon: {
        flex: 1,
        flexGrow:0,
        flexShrink:1,
        flexBasis:'20%',
        alignItems: 'center',
        justifyContent: 'center',
        padding:'1%'
    },
    iconButton: {
      padding: '1%',
    },
    iconImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
        padding:'1%'
    },
    filterButton: {
        flexGrow:3,
        flexShrink:0,
        backgroundColor: colors.transWhite,
        borderRadius: '30%',
        alignItems:'center',
        paddingHorizontal:'2%',
        paddingVertical: '2%',
        borderWidth: '1%',
        borderColor: colors.semiTransWhite,
    },
    filterText: {
        color: colors.white,
        fontSize: '15%',
        textAlign:'center',
    },
    fullScreenDropdown: {
        position: 'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0,
        backgroundColor:colors.semiTransGrey,
        zIndex: 1000,
        justifyContent: 'start',
        alignItems: 'center',
      },
    dropDownScroll:{
        paddingTop:'20%',
    },
    dropdownItem: {
        fontSize: '20%',
        color: colors.white,
        alignSelf:'center',
        paddingVertical:'3%',
    },
    

})