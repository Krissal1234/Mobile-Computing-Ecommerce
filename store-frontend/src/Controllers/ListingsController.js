import {getEquipmentListingsByUserUID,getFacilitytListingsByUserUID,getListingsByUserUid,getAllListedSports,getPaymentSheet, createPaymentSheet } from '../../config/firebase';

export class ListingsController {


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

  static async getAllSports(){
    try{
      const response = await getAllListedSports()
        if(response.data.success){
          const sports = response.data.data;
          const sportCategories = [];
          for (let i = 0; i < sports.length; i++) {
            sportCategories.push(sports[i].sport);
          }

          return {success: true, message: "Successfully returned sports", data: sportCategories}
        }else{
          console.error(response.data.message);
          return {success: false, message: "Something went wrong"}
        }
    } catch (error) {
      console.error('Error retrieving sports:', error);
      return { success: false, message: "An error occurred while retrieving sports." };
    }

  }
  static async _getPaymentSheet(){
    try {
      const response = await getPaymentSheet();
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  static async _createPaymentSheet(order){
    try{
      const response = await createPaymentSheet({order: order});
      return (response)
    }
    catch (error) {
      return (error)
    }
  }
  static async getAllEquipmentUserListings(userUid){
    try{
      const response = await getEquipmentListingsByUserUID(userUid);
      return {
        success: true,
        message: response.data.message,
        data:response.data.data,
      }
    }catch(error){
      console.error(error);
    }
  }
  static async getAllFacilityUserListings(userUid){
    try{
      const response = await getFacilitytListingsByUserUID(userUid);
      return {
        success: true,
        message: response.data.message,
        data: response.data.data
      }
    }catch(error){
      console.error(error);
    }

  }
}
