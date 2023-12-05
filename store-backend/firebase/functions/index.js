/* eslint-disable */

// exports.PostProductItemToFirestore = onCall((request, response) => {
//   // const testData = {
//   //   "title": "Mountain Bike",
//   //   "description": "A durable mountain bike for off-road adventures.",
//   //   "category": "Bicycles",
//   //   "price": 20.00,
//   //   "currency": "EUR"
//   //   "location": {
//   //    "lon" : 23.1232,
//   //    "lat": 25.2323,
//   //   },
//   //   "rental_period": {
//   //     "min_days": 1,
//   //     "max_days": 7
//   //   },
//   //   "owner": {
//   //     "user_id": "seller123",
//   //     "username": "bike_owner",
//   //     "email": "owner@example.com",
//   //     "phone": "+1234567890"
//   //   },
//   //   "images": [
//   //     "https://example.com/bike_image1.jpg",
//   //     "https://example.com/bike_image2.jpg"
//   //   ],
//   // };


//     // const pitch = {
//   //   "title": "Mountain Bike",
//   //   "description": "A durable mountain bike for off-road adventures.",
//   //   "sport": "football",
//   //    category: equipment/pitches
//   //   "price": 20.00,
//   //   "currency": "EUR"
//   //   "location": {
//   //    "lon" : 23.1232,
//   //    "lat": 25.2323,
//   //   },
//   //   "rental_period": {
//         //hourly basis
//   //   },
//   //   "owner": {
//   //     "user_id": "seller123",
//   //     "username": "bike_owner",
//   //     "email": "owner@example.com",
//   //     "phone": "+1234567890"
//   //   },
//   //   "images": [
//   //     "https://example.com/bike_image1.jpg",
//   //     "https://example.com/bike_image2.jpg"
//   //   ],
//   // };




//   const data = request.body;

//   if (!data || Object.keys(data).length === 0) {
//     return response.status(400).json({ error: 'Bad Request: Missing or empty request body.' });
//   }
//   //Idea: Add rating field over here, then create another function
//   // that can add to the rating by requiring the id and rating
//   //Store in database
//   firestore.collection("items").add(data)
//     .then((docRef) => {
//       logger.info("Document added with ID: ", docRef.id, { structuredData: true });
//       response.status(200).send(); 
//      })
//     .catch((error) => {
//       logger.error("Error adding document: ", error, { structuredData: true });
//       response.status(500).send("Internal Server Error");
//     });
// });

const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp(functions.config().firebase)

const db = admin.firestore();

exports.registerUser = functions.https.onCall(async (data, context) => {
  try {
    // Extract data from the argument
    const { email, password, username } = data;

    if (!email || !password || !username) {
      // Return an error response
      return {
        status: 'error',
        message: 'Invalid request. Missing required fields.',
      };
    }

    // Checking if email is already in use
    const emailExists = await isEmailInUse(email);
    if (emailExists) {
      return {
        status: 'error',
        message: 'Email is already in use.',
      };
    }

    // Checking if username is already in use
    const usernameExists = await isUsernameInUse(username);
    if (usernameExists) {
      return {
        status: 'error',
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
      status: 'success',
      message: `User ${userRecord.uid} successfully registered.`,
    };
  } catch (error) {
    console.error('Error registering user:', error);


    return {
      status: 'error',
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
        status: 'success',
        message: 'User found',
        data: user,
      };
    } else {
      return {
        status: 'error',
        message: 'User not found',
      };
    }
  } catch (error) {
    console.error('Error getting user:', error);
    return {
      status: 'error',
      message: 'Internal Server Error',
    };
  }
});

