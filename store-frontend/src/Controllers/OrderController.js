
import { postOrder } from '../../../store-backend/firebase/functions';


export class OrderController {

    //expected parameter:
    //usersBasket = [
//     {
//         itemId: "equipment123",
//         pricePerHour: 2,
//         rentalPeriod: {
//             start: "2023-07-01",
//             end: "2023-07-05"
//         },
//     },
// ];
    static async createOrder(usersBasket,user){
        //usersBasket {
        if(!usersBasket || usersBasket.length == 0){
            return {success: false, message: "The basket is empty"};
        }

        let totalPrice = 0;

        //Calculating total price
        usersBasket.forEach(item => {
            const { price_per_hour, rental_period } = item;
            const startTime = new Date(rental_period.start);
            const endTime = new Date(rental_period.end);
            const durationHours = (endTime - startTime) / 3600000; // Convert milliseconds to hours
            const price = durationHours * price_per_hour;
            totalPrice += price;
        });
        //Adding user data to order
        const user ={
            userUid: user.user.uid, 
            email: user.user.email, 
            username: user.user.displayName
          };

        const orderDetails = {
            totalPrice,
            item: usersBasket,
            user: user,
            status: "processing" //This will change to paid/finished, once paypal payment succeeds
        }


    try{
        const response = await postOrder(orderDetails);
        if(response.data.success){
            return {success: true, message: response.data.message, data: response.data.data}
        }else{
            console.log(response.data.message);
            return {success:false, message: response.data.message}
        }
    }catch(error){
        console.error(error);
        return {success:false, message: "Internal server error"}  
    }

    }


}