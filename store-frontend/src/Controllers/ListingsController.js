import { getListingsByUserUid } from '../../config/firebase';

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
}
  