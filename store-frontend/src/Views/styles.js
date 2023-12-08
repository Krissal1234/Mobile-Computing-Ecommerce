import { StyleSheet } from 'react-native';
import {colors} from './colors'
export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        marginBottom:40,
        marginTop:10,
    },
    input: {
        backgroundColor: colors.white,
        width:300,
        marginTop: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderWidth:3,
        borderColor:colors.red,
        alignItems: "center",
        justifyContent: 'center',
        padding:20
    },
    button: {
        backgroundColor: colors.white,
        width:300,
        marginTop: 40,
        paddingVertical: 15,
        borderRadius: 25,
        borderWidth:3,
        borderColor:colors.red,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 5
    },
    footerText: {
        fontSize: 15,
        color: colors.white
    },
    footerLink: {
        color: colors.lightBlue,
        fontWeight: "bold",
        fontSize: 15
    }
})