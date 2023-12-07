import { StyleSheet } from 'react-native';
import {colors} from './colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:colors.darkBlue
    },
    keyboardContainer:{
        flexGrow:1,
    },
    title: {

    },
    logo: {
        height: '30%',
        width: '30%',
        padding:'40%',
        alignSelf: "center",
        margin: 30
    },
    input: {
        backgroundColor: colors.white,
        width:'80%',
        marginHorizontal:'10%',
        marginTop: '10%',
        height: '10%',
        borderRadius: '20%',
        borderWidth:'3%',
        borderColor:colors.red,
        alignItems: "center",
        justifyContent: 'center',
        paddingLeft:'5%'
    },
    button: {
        backgroundColor: colors.white,
        width:'80%',
        marginHorizontal:'10%',
        marginTop: '10%',
        height: '10%',
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
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})