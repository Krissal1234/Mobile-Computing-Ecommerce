import { postEquipment,postFacility } from '../../config/firebase';

export class RentingController {

  //Post equipment to be rented out, e.g. boxing gloves
  static async PostEquipment(equipmentData, user) {
   const {deliveryType,pickup_location} = equipmentData;
    equipmentData.owner = {
      userUid: user.user.uid, 
      email: user.user.email, 
      username: user.user.displayName
    };

    if (deliveryType === 'pickup') {
      equipmentData.pickup_location = pickup_location;
    }

    try {
      var response = await postEquipment(equipmentData);
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

//Fields expected
  // title,
  // description,
  // price,
  // sport_category,
  // available_status,
  // standard_rent_time,
  // images,
  // location,
  // unavailable_dates,
  static async postFacility(facilityData, user){
    //Adding owner field
    facilityData.owner = {
      userUid: user.user.uid, 
      email: user.user.email, 
      username: user.user.displayName
    };
    console.log("facilitydata i ncontroller"+  facilityData.location);

    try {
      var response = await postFacility(facilityData);
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
  