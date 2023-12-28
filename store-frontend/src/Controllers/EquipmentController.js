import { postEquipment, getAllAvailableEquipment, filterEquipmentBySport,filterFacilitiesBySport } from '../../config/firebase';


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
    static async PostEquipment(equipmentData,user) {
        const {deliveryType,pickup_location} = equipmentData;
         equipmentData.owner = {
           userUid: user.user.uid, 
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

      static async getAllAvailableEquipment(){
        //return all equipment with availability status true
        try{
          var equipment = await getAllAvailableEquipment();
          return {success: true, message: "Successfully retrieved available equipment", data: equipment};
        }catch(error){
          return {success: false, message: "Internal Server Error"}
        }
      }

      static async filterEquipmentBySport(filter){ 
        //return all equipment with availability status true
        try{
          console.log("Hello?");
          var response = await filterEquipmentBySport(filter);
          
          if(response.data.success){
            return {success: true, message: "Successfully retrieved available equipment", data:response.data.data};
          }
        
          console.log(equipment.data.message);
          
        }catch(error){
          return {success: false, message: error}
        }
      }
}
