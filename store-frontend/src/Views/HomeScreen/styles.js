import { StyleSheet } from 'react-native';
import {colors} from '../colors'
import { Dimensions } from 'react-native';

const{width,height} = Dimensions.get('window');

export default StyleSheet.create({
        container:{
            flex:1,
            height:height,
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: colors.darkBlue,
        },    
        logo: {
        paddingVertical:height*0.28,
        width:width*1.1,
        height:height*0.5,
        alignSelf:'center',
        resizeMode:'cover',
    },
})