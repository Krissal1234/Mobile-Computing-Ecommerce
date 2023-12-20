import { postEquipment } from '../../config/firebase';

export class RentingController {

  //Post equipment to be rented out, e.g. boxing gloves
  static async PostEquipment(equipmentData, user) {
    const { title, sportCategory, condition, price, available_status, deliveryType, description, pickup_location, images } = equipmentData;
    //console.log("user from renting:" + user.user.uid);
   const owner = {userUid: user.user.uid, email: user.user.email, username: user.user.displayName};
   
    // /console.log("user from renting:" + user);
    const equipmentEntry = {
      title,
      description,
      price,
      sportCategory,
      available_status,
      deliveryType,
      condition,
      images,
      owner,
    };

    if (deliveryType === 'pickup') {
      equipmentEntry.pickup_location = pickup_location;
    }

    try {
      var response = await postEquipment(equipmentEntry);
      if(response.data.success){
        return { success: true, message: 'Equipment inputted successfully'};
      }else{
        return {success: false, message: "Failed to input Equipment"}
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "An error occurred when inputting your equipment." };
    }
  }

  static async postFacility(facilityData, user){
    const { title, sportCategory, price, description, location, images, dates } = equipmentData;
   const owner = {userUid: user.user.uid, email: user.user.email, username: user.user.displayName};
   
    const equipmentEntry = {
      title,
      description,
      price,
      sportCategory,
      images,
      location,
      owner,
    };

    if (deliveryType === 'pickup') {
      equipmentEntry.pickup_location = pickup_location;
    }

    try {
      var response = await postEquipment(equipmentEntry);
      if(response.data.success){
        console.log('Equipment posted successfully:', response);
        return { success: true, message: 'Equipment inputted successfully'};
      }else{
        return {success: false, message: "Failed to input Equipment"}
      }
    } catch (error) {
      console.error('Error posting equiprment:', error);
      return { success: false, message: "An error occurred when inputting your equipment." };
    }
  }
    
  }
  