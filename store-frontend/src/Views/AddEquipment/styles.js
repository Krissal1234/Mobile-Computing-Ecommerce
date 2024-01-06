import { StyleSheet } from 'react-native';
import {colors} from '../colors'
import { StatusBar, Dimensions } from 'react-native';

const{width,height} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.darkBlue,
        ...Platform.select({
            ios: {  
            },
            android: {
                paddingTop:StatusBar.currentHeight,
            },
          }),
      },

      choiceScreenContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: colors.darkBlue,
        padding: 20, 
        
        ...Platform.select({
          ios: {  
          },
          android: {
              paddingTop:StatusBar.currentHeight,
          },
        }),
      },
      
      scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingBottom: 30,
      },
      card: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#A2383A',
      },
      label: {
        color: '#A2383A',
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
      },
      input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
      },
      image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 10,
      },
      choosePhotoText: {
        textAlign: 'center',
        color: '#A2383A',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      mapContainer: {
        marginTop: 10,
      },
      mapInput: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
      },
      map: {
        height: 200,
        marginTop: 10,
      },
      dropdownButton: {
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 5,
      },
      dropdownButtonText: {
        color: '#333',
      },
      dropdownOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      dropdownContainer: {
        position: 'absolute',
        top: 140,
        right: 10,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 5,
        padding: 10,
      },
      dropdownItem: {
        padding: 10,
      },
      errorMessage: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
      },
      successMessage: {
        color: 'green',
        textAlign: 'center',
        fontSize: 16,
      },
      photoButton: {
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 10, 
        
      },
      
      
      
    })
    
