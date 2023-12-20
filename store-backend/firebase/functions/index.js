/* eslint-disable */

const admin = require("firebase-admin");
const functions = require("firebase-functions");
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


exports.postEquipment = functions.https.onCall((data, context) => {
  // Ensure user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }
  data.createdAt = admin.firestore.FieldValue.serverTimestamp(); // optional: add timestamp when data is added
  //const {title, sport_category, condition,price, available_status, deliveryType,description,pickup_location, images, owner } = data;
  // You can use these fields as needed in your function
  
  
  // Create an object to store in Firebase
  // const equipmentEntry = {
  //   title,
  //   description,
  //   price,
  //   sport_category,
  //   available_status,
  //   deliveryType,
  //   condition,
  //   images,
  //   pickup_location,
  //   owner,
  //   createdAt: 
  // };

  // Add the equipment data to Firestore
  return db.collection('equipment').add(data)
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
exports.postFacility = functions.https.onCall((data, context) => {
  // Ensure user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }
  data.createdAt = admin.firestore.FieldValue.serverTimestamp(); // optional: add timestamp when data is added


  // Add the equipment data to Firestore
  return db.collection('facilities').add(data)
    .then(docRef => {
      console.log('Document written with ID: ', docRef.id);
      return { success: true, message: 'Facility successfully added', id: docRef.id };
    })
    .catch(error => {
      console.error('Error adding document: ', error);
      return { success: false, message: 'Error adding facility data', error: error };
    });
});