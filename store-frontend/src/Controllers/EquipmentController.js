import { postEquipment} from '../../config/firebase';
import { UserContext } from '../../Contexts/UserContext';
const {user} = useContext(UserContext);



export class EquipmentController {
    // title: 'Boxing Gloves',
    //  sport_category: 'Boxing',
    //  condition: 'New',
    //  pricePerHour: 20,
    //  available_status: 'Available',
    //  deliveryType: 'pickup',
    //  description: 'High-quality leather boxing gloves',
    //  pickup_location: '123 Main St',
    //  images: ['image_url1', 'image_url2'],


  
    static async PostEquipment(equipmentData) {
        const {deliveryType,pickup_location} = equipmentData;
         equipmentData.owner = {
           user_uid: user.user.uid, 
           email: user.user.email, 
           username: user.user.displayName
         };
         equipmentData.type = "equipment";
     
         if (deliveryType === 'pickup') {
           equipmentData.pickup_location = pickup_location;
         }
     
         try {
           var response = await postEquipment(equipmentData);
           if(response.data.success){
             return { success: true, message: 'Equipment inputted successfully'};
           }else{
             console.error(response.data.message);
             return {success: false, message: "Failed to input Equipment"}
           }
         } catch (error) {
           console.error(error);
           return { success: false, message: "An error occurred when inputting your equipment." };
         }
       }
       static async getEquipmentSportsCategories(){

       }

       createEquipe
}
