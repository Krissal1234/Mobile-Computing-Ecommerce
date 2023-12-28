/* eslint-disable */

const e = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { user } = require("firebase-functions/v1/auth");

const stripe = require('stripe')('sk_test_51LoBCWGC9MhpkKozXeOQoG0UPShJdolQg9mXSa9w799aFFX0uCvv9Xf2rFjaC0xhhBCtxrGV5Qia2dozYnHZzbaL00DFxT0TIE');

admin.initializeApp(functions.config().firebase)

const db = admin.firestore();

//Register a User into sportyRentals -------------
exports.registerUser = functions.https.onCall(async (data, context) => {
  try {
    // Extract data from the argument
    const { email, password, username } = data;

    if (!email || !password || !username) {
      // Return an error response
      return {
        success: false,
        message: 'Invalid request. Missing required fields.',
      };
    }

    // Checking if email is already in use
    const emailExists = await isEmailInUse(email);
    if (emailExists) {
      return {
        success: false,
        message: 'Email is already in use.',
      };
    }

    // Checking if username is already in use
    const usernameExists = await isUsernameInUse(username);
    if (usernameExists) {
      return {
        success: false,
        message: 'Username is already in use.',
      };
    }

    // Create user
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: username,
    });

    //Adding user data to db
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email: email,
      username: username,
    });

    return {
      success: true,
      message: `User successfully registered.`,
    };
  } catch (error) {
    console.error('Error registering user:', error);


    return {
      success: false,
      message: 'Internal Server Error',
    };
  }
});

async function isEmailInUse(email) {
  const userRecord = await admin.auth().getUserByEmail(email).catch(() => null);
  return !!userRecord;
}

async function isUsernameInUse(username) {
  const querySnapshot = await admin.firestore().collection('users').where('username', '==', username).get();
  return !querySnapshot.empty;
}

//Param: email
//checks if user has already been registered through their email
exports.getUser = functions.https.onCall(async (data, context) => {
  try {
    // Assuming the email is passed as a property of the data parameter
    const email = data.email;

    const doc = await admin.firestore().collection("users").where("email", "==", email).get();

    let user = {};
    doc.forEach((doc) => {
      user = { id: doc.id, ...doc.data() };
    });

    if (user.id) {
      return {
        success: true,
        message: 'User found',
        data: user,
      };
    } else {
      return {
        success: false,
        message: 'User not found',
      };
    }
  } catch (error) {
    console.error('Error getting user:', error);
    return {
      success: false,
      message: 'Internal Server Error',
    };
  }
});

//Equipment Input
exports.postEquipment = functions.https.onCall(async (data, context) => {
  // Ensure user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }
  data.createdAt = admin.firestore.FieldValue.serverTimestamp(); // optional: add timestamp when data is added

  // Add the equipment data to Firestore
  return await db.collection('equipment').add(data)
    .then(docRef => {
      console.log('Document written with ID: ', docRef.id);
      return { success: true, message: 'Equipment successfully added', id: docRef.id };
    })
    .catch(error => {
      console.error('Error adding document: ', error);
      return { success: false, message: 'Error adding equipment data', error: error };
    });
});

//FACILITY INPUT
exports.postFacility = functions.https.onCall(async (data, context) => {
  // Ensure user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }
  data.createdAt = admin.firestore.FieldValue.serverTimestamp(); // optional: add timestamp when data is added

  // Add the equipment data to Firestore
  return await db.collection('facilities').add(data)
    .then(docRef => {
      console.log('Document written with ID: ', docRef.id);
      return { success: true, message: 'Facility successfully added', id: docRef.id };
    })
    .catch(error => {
      console.error('Error adding document: ', error);
      return { success: false, message: 'Error adding facility data', error: error };
    });
});

exports.getListingsByUserUid = functions.https.onCall(async (data,context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }
  try {

    const userUid = data.userUid;


    const equipmentQuery = await db.collection("equipment").where("owner.userUid", "==", userUid).get();
    const facilitiesQuery = await db.collection("facilities").where("owner.userUid", "==", userUid).get();
   
    const [equipmentSnapshot, facilitiesSnapshot] = await Promise.all([equipmentQuery, facilitiesQuery]);

    let equipmentList = [];
    let facilitiesList = [];

    //to append the specific document id
    equipmentSnapshot.forEach(doc => {
      equipmentList.push({ id: doc.id, ...doc.data(), type: 'equipment' });
    });

    facilitiesSnapshot.forEach(doc => {
      facilitiesList.push({ id: doc.id, ...doc.data(), type: 'facility' });
    });

    // Combine both lists
    const combinedListings = equipmentList.concat(facilitiesList);

    return {
      success: true,
      message: 'Listings retrieved successfully for the user',
      data: combinedListings,
    };
  } catch (error) {
    console.error('Error retrieving listings by user UID:', error);
    return {
      success: false,
      message: 'Internal Server Error',
    };
  }
});
// exports.getFacilitySportsCategories = functions.https.onCall(async (data,context) => {


// });

exports.getFacilityById =functions.https.onCall(async (data,context) => {

try{
    const facility = await db.collection('facilities').doc(data.itemId).get();
    if(!facility.exists){
      return {success: false, message: "Facility not found"};
    }else{
      return {success: true, message: "Facility found", data: facility};
    }
}catch(error){
    console.error("Error getting facility", error);
    return {success:false, message: "Internal server error, check firebase logs"};
}

});

exports.getEquipmentById= functions.https.onCall(async (data,context) => {

  try{
    const equipment = await db.collection('equipment').doc(data.itemId).get();
    if(!equipment.exists){
      return {success: false, message: "Equipment not found"};
    }else{
      return {success: true, message: "Equipment found", data: equipment};
    }
}catch(error){
    console.error("Error getting equipment", error);
    return {success:false, message: "Internal server error, check firebase logs"};
}

});

exports.postOrder = functions.https.onCall(async (data,context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }
  
  const orderDetails = data;
  orderDetails.createdAt =  admin.firestore.FieldValue.serverTimestamp(); // optional: add timestamp when data is added
  
  return await db.collection('orders').add(orderDetails)
  .then(docRef => {
    console.log('order written with ID: ', docRef.id);
    return { success: true, message: 'Order successfully added', id: docRef.id };
  })
  .catch(error => {
    console.error('Error adding order: ', error);
    return { success: false, message: 'Error processing order', error: error };
  });
});

exports.getAllAvailableEquipment = functions.https.onCall(async (data,context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }
    try{
      const snapshot = await db.collection('equipment')
      .where('availableStatus', '==', true)
      .get();

    const availableItems = [];
    snapshot.forEach(doc => availableItems.push({ id: doc.id, ...doc.data() }));

      return {success: true, message: "Successfully retrieved equipment data", data: availableItems};
    }catch(error){
      console.error("Error getting equipment",error);
      return {success:false, message: "Internal server error"}
    }
});

exports.getAllAvailableFacilities = functions.https.onCall(async (data,context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }
    try{
      const snapshot = await db.collection('facilities')
      .where('availableStatus', '==', true)
      .get();

    const availableItems = [];
    snapshot.forEach(doc => availableItems.push({ id: doc.id, ...doc.data() }));

      return {success: true, message: "Successfully retrieved facilities", data: availableItems};
    }catch(error){
      console.error("Error getting facilities",error);
      return {success:false, message: "Internal server error"}
    }
});

exports.filterFacilitiesBySport = functions.https.onCall(async (data,context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }
  
  try {
    // Get the filter value from the request query parameters
    const filter = data.filter; 

    // Reference to your Firestore collection
    const facilitiesRef = db.collection('facilities');

    // Apply the filter to the query !!Adjust FieldName!!
    const querySnapshot = await facilitiesRef.where('sport_category', '==', filter).get();

    const filteredData = [];
    querySnapshot.forEach((doc) => {
      filteredData.push(doc.data());
    });

    return {success: true, message: "Successfully filtered Facilities", data:filteredData};
    }catch(error){
      console.error("Error filtering facilities",error);
      return {success:false, message: "Internal server error"}
    }
})

exports.filterEquipmentBySport = functions.https.onCall(async (data,contex) => {
  try {
    // Get the filter value from the request query parameters
    const filter = data.filter; 

    // Reference to Firestore collection of Equipment 
    const EquipmentRef = db.collection('equipment');

    // Apply the filter to the query //Adjust fieldName
    const querySnapshot = await EquipmentRef.where('sport_category', '==', filter).get();

    const filteredData = [];
    querySnapshot.forEach((doc) => {
      filteredData.push(doc.data());
    });

    return {success: true, message: "Successfully filtered equipment", data:filteredData};
    }catch(error){
      console.error("Error filtering equipment",error);
      return {success:false, message: "Internal server error"}
    }
});

exports.getAllListedSports = functions.https.onCall(async (data,contex) => {

try{
  const sports = await db.collection('sports').get();
  return {success: true, message: "Successfully retrieved listed sports", data: sports};
}catch(error){
  console.error("Error getting equipment",error);
  return {success:false, message: "Internal server error"}
}

});

exports.getPaymentSheet = functions.https.onCall(async (data, context) => {
  try {
    // Create a new Stripe express account
    const account = await stripe.accounts.create({
      type: 'express',
    });

    const accountId = account.id;

    // Create an account link for the onboarding process
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: 'https://example.com/reauth',
      return_url: 'https://example.com/return',
      type: 'account_onboarding',
    });

    return {
      success: true,
      accountLink: accountLink.url,
    };

  } catch (error) {
    console.error('Error creating Stripe account:', error);
    return {
      success: false,
      message: 'Internal Server Error',
    };
  }
});