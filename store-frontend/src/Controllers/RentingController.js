import { postEquipment,postFacility,getListingsByUserUid } from '../../config/firebase';

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
        console.error(response.data.message);
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
  // unavailable_dates, //      unavailable_dates: [
      ///   { date: '2024-06-15', unavailableSlots: [{ start: '09:00', end: '12:00' }] },
      //   /{ date: '2024-06-16', unavailableSlots: [{ start: '13:00', end: '15:00' }] }
      /// ]
  // rental_period, // {start 8:00, end 22:00}
  static async postFacility(facilityData, user){
    //Adding owner field

    if (facilityData.rental_period) {
      const { start, end } = facilityData.rental_period;
      if (!validateTimeFormat(start) || !validateTimeFormat(end) || start >= end) {
        return {success: false, message: "Invalid date format"}
      }
    facilityData.owner = {
      userUid: user.user.uid, 
      email: user.user.email, 
      username: user.user.displayName
    };

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
    
  }
  static validateTimeFormat(time) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  }

  static async getUserListings(userUid){
  try{
    const response = await getListingsByUserUid({userUid: userUid})
      if(response.data.success){
        return {success: true, message: "Successfully returned listings by user", data: response.data.data}
      }else{
        console.error(response.data.message);
        return {success: false, message: "Something went wrong"}
      }
  } catch (error) {
    console.error('Error retrieving listings:', error);
    return { success: false, message: "An error occurred while retrieving listings." };
  }
   
  }
}
  