import { StyleSheet } from 'react-native';
import {colors} from './colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start', // Adjusted
        flexDirection: 'column',
        backgroundColor: colors.darkBlue,
        padding: '5%',
    },
    keyboardContainer:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {

    },
    logo: {
        height: '30%',
        width: '30%',
        padding:'40%',
        alignSelf: "center",
        margin: '10%'
    },
    input: {
        backgroundColor: colors.white,
        width:'80%',
        marginHorizontal:'10%',
        marginTop: '10%',
        paddingVertical: 15,
        borderRadius: '20%',
        borderWidth:'3%',
        borderColor:colors.red,
        alignItems: "center",
        justifyContent: 'center',
        padding:'5%'
    },
    button: {
        backgroundColor: colors.white,
        width:'80%',
        marginHorizontal:'10%',
        marginTop: '10%',
        paddingVertical: 15,
        borderRadius: '20%',
        borderWidth:'3%',
        borderColor:colors.red,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: '#04080E',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: '5%'
    },
    footerText: {
        fontSize: '15%',
        color: colors.white
    },
    footerLink: {
        color: colors.lightBlue,
        fontWeight: "bold",
        fontSize: '15%'
    }
})