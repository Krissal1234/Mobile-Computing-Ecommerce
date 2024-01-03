import { postFacility,getAllAvailableFacilities,filterFacilitiesBySport } from '../../config/firebase';
import {
  getRef,
  getFirebaseStorage,
  uploadImage,
  getCloudDownloadURL,
} from "../../config/firebase";



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

        facilityData.owner = {
          userUid: user.user.uid, 
          email: user.user.email, 
          username: user.user.displayName
        };
        facilityData.type = "facility";
        
        try {
          await this._handleImageUpload(facilityData, user);

          var response = await postFacility(facilityData);
          if(response.data.success){
            console.log('Facility posted successfully:', response);
            return { success: true, message: 'Facility inputted successfully'};
          }else{
            console.error(response.data.message);
            return {success: false, message: "Failed to input Facility"}
          }
        } catch (error) {
          console.error('Error posting Facility:', error);
          return { success: false, message: "An error occurred when inputting your Facility." };
        }
      } 
      

      static async _handleImageUpload(facilityData, user) {
        const { imageReference } = facilityData;
        const image = await fetch(imageReference);
        const blob = await image.blob();
    
        const storageRef = getFirebaseStorage();
        const imageRef = getRef(
          storageRef,
          `images/${user.user.uid}/${Date.now()}.jpg`
        );
        const snapshot = await uploadImage(imageRef, blob);
        const downloadURL = await getCloudDownloadURL(snapshot.ref);
        console.log("Download URL: ", downloadURL);
    
        facilityData.imageReference = downloadURL;
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