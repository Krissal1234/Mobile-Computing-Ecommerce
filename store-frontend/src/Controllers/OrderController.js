
import { getCurrentOrders, getPastOrders, postOrder } from "../../config/firebase";

export class OrderController {
    // const order = {
    //     rentalPeriod: {
    //       start :{
    //         startDate: startDate,
    //         startTime: selectedStartTime
    //       },
    //       end: {
    //         endDate:endDate,
    //         endTime: selectedEndTime
    //       }
    //       },
    //       item: equipment
    //     }
    static async createOrder(order,user){

    try{
    //Adding user data to order
        const renter ={
            userUid: user.user.uid, 
            email: user.user.email, 
            username: user.user.displayName
            };


        const orderDetails = {
            rentalPeriod: order.rentalPeriod,
            item: order.item,
            renter: renter,
            totalPrice: order.totalPrice,
            status: "processing" //This will change to paid/finished, once paypal payment succeeds
        }

        const response = await postOrder(orderDetails);
        if(response.data.success){
            return {success: true, message: response.data.message, data: response.data.data}
        }else{
            console.log(response.data.message);
            return {success:false, message: response.data.message}
        }
    }catch(error){
        console.error(error.message);
        return {success:false, message: "Internal server error"}  
    }
}

static async getPastBookings(userId){
    try{
        const response = await getPastOrders(userId);
        console.log(response.data.data);
        if (response.data.success){
            return {success: true, message: response.data.message,data: response.data.data }
        }else{
            return {success: false, message: response.data.message }
        }
    }catch(error){
        console.error("ERROR Internal SERver error");
    }
}

static async getFutureBookings(userId){
    try{
        const response = await getCurrentOrders(userId);
        if (response.data.success){
            return {success: true, message: response.data.message,data: response.data.data }
        }else{
            return {success: false, message: response.data.message }
        }
    }catch(error){
        console.error("ERROR Internal SERver error");
    }
}
}