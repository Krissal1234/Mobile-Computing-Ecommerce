import { getStateFromPath } from '@react-navigation/native';
import { postEquipment, getAllAvailableEquipment, filterEquipmentBySport,getEquipmentById } from '../../config/firebase';
import { getRef,getFirebaseStorage, uploadImage ,getCloudDownloadURL} from '../../config/firebase';
export class EquipmentController {

  // title: 'Boxing Gloves',
  //  sportCategory: 'Boxing',
  //  condition: 'New',
  //  pricePerHour: 20,
  //  availableStatus: 'Available',
  //  deliveryType: 'pickup',
  //  description: 'High-quality leather boxing gloves',
  //  pickupLocation: '123 Main St',
  //  images: 'image_url2',
  static async PostEquipment(equipmentData,user) {
    const {handoverType,pickupLocation, imageReference} = equipmentData;
    equipmentData.owner = {
      userUid: user.user.uid, 
      email: user.user.email, 
      username: user.user.displayName
    };
    
    equipmentData.type = "equipment";
  
    if (handoverType === 'pickup') {
      equipmentData.pickupLocation =pickupLocation;
    }
     //Client side image upload to Firebase Cloud Storage
    const image = await fetch(imageReference);
    const blob = await image.blob();
    try{
    const storageRef =  getFirebaseStorage();
    const imageRef = getRef(storageRef,`images/${user.user.uid}/${Date.now()}.jpg`);
    
    const downloadURL = await uploadImage(imageRef,blob);
      delete equipmentData.imageReference;
      equipmentData.image = downloadURL.ref.toString;
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
      var response = await getAllAvailableEquipment();
      if(response.data.success){
        return {success: true, message: "Successfully retrieved available equipment", data: response.data.data};
      }else{
        return{success: false, message: "Failed to retrieve available equipment"+ response.data.message}
      }
          
    }catch(error){
      return {success: false, message: "Internal Server Error"}
    }
  }

  static async filterEquipmentBySport(filter){ 
    //return all equipment with availability status true and filter by sport
    try{
      var response = await filterEquipmentBySport(filter);
       
      if(response.data.success){
        return {success: true, message: "Successfully retrieved available equipment", data:response.data.data};
      }
      else{
        return{success: false, message: "Failed to retrieve available equipment" + response.data.message}
      }
    }catch(error){
      return {success: false, message: error}
    }
  }

  static async getEquipmentById(id){ 
    try{
      var response = await getEquipmentById(id);
       
      if(response.data.success){
        return {success: true, message: "Successfully retrieved equipment by ID ", data:response.data.data};
      }
      else{
        return{success: false, message: "Failed to retrieve equipment by ID " + response.data.message}
      }
    }catch(error){
      return {success: false, message: error}
    }
  }

  async uploadImage(imageRef, blob){
    await uploadImage(imageRef,blob).then((snapshot) => {
      console.log('Uploaded a blob');

     getCloudDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        return downloadURL;

      });
    }).catch((error) => {
      console.error("Error uploading image: ", error);
    });   
  }

}
