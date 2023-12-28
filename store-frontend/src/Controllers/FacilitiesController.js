import { postFacility,getAllAvailableFacilities,filterFacilitiesBySport } from '../../config/firebase';




export class FacilitiesController {
    //Fields expected
  // title,
  // description,
  // price per hour,
  // sport_category,
  // available_status,
  // images,
  // location,
   static async postFacility(facilityData, user){
        //Adding owner field
    
          //Adding owner to the facility data
        facilityData.owner = {
          userUid: user.user.uid, 
          email: user.user.email, 
          username: user.user.displayName
        };
        facilityData.type = "facility";
        
        try {
          var response = await postFacility(facilityData);
          if(response.data.success){
            console.log('Equipment posted successfully:', response);
            return { success: true, message: 'Equipment inputted successfully'};
          }else{
            console.error(response.data.message);
            return {success: false, message: "Failed to input Equipment"}
          }
        } catch (error) {
          console.error('Error posting equiprment:', error);
          return { success: false, message: "An error occurred when inputting your equipment." };
        }
      } 
      


      static async getAllAvailableFacilities(){
        //return all facilties with availability status true
        try{
          var response = await getAllAvailableFacilities();
          if(response.data.success){
            return {success: true, message: "Successfully retrieved available facilities", data: response.data.data};
          }
          else{
            return {success: false, message: "Failed to retrieve available facilities"+ response.data.message};
          }
        }catch(error){
          return {success: false, message: "Internal Server Error"}
        }
      }

      static async filteredFacilitiesBySport(sport){
        //return all equipment with availability status true
        try{
          var response = await filterFacilitiesBySport(sport);
          if(response.data.success){
          return {success: true, message: "Successfully retrieved available equipment", data:response.data.data};
          }else{
            return {success: false, message: "Failed to retrieve filtered equipment"+ response.data.message};
          }
        }catch(error){
          return {success: false, message: "Internal Server Error"}
        }
      }
}