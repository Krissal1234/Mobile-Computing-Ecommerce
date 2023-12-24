
import { postOrder } from '../../../store-backend/firebase/functions';


export class OrderController {

    //expected parameter:
    //usersBasket = [
//     {
//         item_id: "equipment123",
//          price_per_hour: 2,
//         rental_period: {
//             start: "2023-07-01",
//             end: "2023-07-05"
//         },
//         // Additional details...
//     },
//     {
//         item_id: "facility456",
//          price_per_hour: 1,
//         rental_period: {
//             start: "2023-07-03T08:00",
//             end: "2023-07-03T18:00"
//         },
//         // Additional details...
//     }
//     // ... more items ...
// ];
    static async createOrder(usersBasket,user){
        //usersBasket {
        if(!usersBasket || usersBasket.length == 0){
            return {success: false, message: "The basket is empty"};
        }

        let total_price = 0;

        //Calculating total price
        usersBasket.forEach(item => {
            const { price_per_hour, rental_period } = item;
            const startTime = new Date(rental_period.start);
            const endTime = new Date(rental_period.end);
            const durationHours = (endTime - startTime) / 3600000; // Convert milliseconds to hours
            total_price += durationHours * price_per_hour;
        });
        //Adding user data to order
        const user ={
            user_uid: user.user.uid, 
            email: user.user.email, 
            username: user.user.displayName
          };

        const orderDetails = {
            total_price,
            items: usersBasket,
            user: user
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
        return {success:false, message: "Internl server error"}    }

    }
}