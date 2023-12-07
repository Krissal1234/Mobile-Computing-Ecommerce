import { StyleSheet } from 'react-native';
import {colors} from '../colors'

export default StyleSheet.create({
        container:{
            flex:1,
            height:'100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: colors.darkBlue,
        },    
        logo: {
        paddingVertical:'60%',
        width:'120%',
        height:'50%',
        alignSelf:'center'
    },
})