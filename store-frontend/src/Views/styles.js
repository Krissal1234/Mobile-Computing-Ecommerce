import { StyleSheet } from 'react-native';
import {colors} from './colors'

export default StyleSheet.create({
    container: {
        height:'100%',
        width: '100%',
        backgroundColor: colors.darkBlue,
    },
    keyboardContainer:{
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop:'5%',
        paddingVertical:'5%',
        borderRadius: '25%',
        borderWidth:'3%',
        borderColor:colors.red,
        alignItems: "center",
        justifyContent: 'center',
        padding:'5%'
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
        marginTop: 5
    },
    footerText: {
        fontSize: '16%',
        color: colors.white
    },
    footerLink: {
        color: colors.lightBlue,
        fontWeight: "bold",
        fontSize: '16%'
    }
})