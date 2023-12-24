import { postFacility } from '../../config/firebase';




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
      

      static async getFacilitySportsCategories(){

      }
}