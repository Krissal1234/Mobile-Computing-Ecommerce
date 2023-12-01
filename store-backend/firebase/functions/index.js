/* eslint-disable */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started


admin.initializeApp();
const firestore = admin.firestore();

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


exports.PostProductItemToFirestore = onRequest((request, response) => {
  // const testData = {
  //   "title": "Mountain Bike",
  //   "description": "A durable mountain bike for off-road adventures.",
  //   "category": "Bicycles",
  //   "price": 20.00,
  //   "currency": "EUR",
  //   "available_quantity": 5,
  //   "location": {
  //    "lon" : 23.1232,
  //    "lat": 25.2323,
  //   },
  //   "rental_period": {
  //     "min_days": 1,
  //     "max_days": 7
  //   },
  //   "owner": {
  //     "user_id": "seller123",
  //     "username": "bike_owner",
  //     "email": "owner@example.com",
  //     "phone": "+1234567890"
  //   },
  //   "images": [
  //     "https://example.com/bike_image1.jpg",
  //     "https://example.com/bike_image2.jpg"
  //   ],
  //   "features": [
  //     "24-speed gears",
  //     "Front suspension",
  //     "Disc brakes"
  //   ],
  // };
  const data = request.body;

  if (!data || Object.keys(data).length === 0) {
    return response.status(400).json({ error: 'Bad Request: Missing or empty request body.' });
  }
  //Idea: Add rating field over here, then create another function
  // that can add to the rating by requiring the id and rating
  //Store in database
  firestore.collection("items").add(data)
    .then((docRef) => {
      logger.info("Document added with ID: ", docRef.id, { structuredData: true });
      response.status(200).send(); 
     })
    .catch((error) => {
      logger.error("Error adding document: ", error, { structuredData: true });
      response.status(500).send("Internal Server Error");
    });
});
