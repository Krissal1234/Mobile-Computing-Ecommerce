import { firebase, initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthCredential,signInWithRedirect } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//DONT CHANGE
const firebaseConfig = {
  apiKey: "AIzaSyBpCJtHqad3BnKh9PKURBVHQp7I6ykFCO0",
  authDomain: "sportyrental.firebaseapp.com",
  projectId: "sportyrentals",
  storageBucket: "gs://sportyrentals.appspot.com",
  messagingSenderId: "79967591982",
  appId: "1:79967591982:android:f7f82758c2bc30443c09bf",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
//For firebase emulator
//connectFunctionsEmulator(functions, "127.0.0.1", 50001)


export const registerUser = httpsCallable(functions, 'registerUser');
export const getUserFunc = httpsCallable(functions, 'getUser');
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const googleSignIn = signInWithPopup;
export const redirectSignIn = signInWithRedirect;
export const login = signInWithEmailAndPassword;
export const getFirebaseStorage = getStorage;
export const getRef = ref;
export const uploadImage = uploadBytes;
export const getCloudDownloadURL = getDownloadURL;
export const postEquipment = httpsCallable(functions,'postEquipment');
export const postFacility = httpsCallable(functions, 'postFacility');
export const getListingsByUserUid = httpsCallable(functions, 'getListingsByUserUid');
export const getEquipmentById = httpsCallable(functions,'getEquipmentById');
export const getFacilityById = httpsCallable(functions,'getFacilityById');
export const postOrder = httpsCallable(functions, 'postOrder');
export const getAllAvailableEquipment = httpsCallable(functions, 'getAllAvailableEquipment');
export const getAllAvailableFacilities = httpsCallable(functions, 'getAllAvailableFacilities');
export const filterEquipmentBySport = httpsCallable(functions, 'filterEquipmentBySport');
export const filterFacilitiesBySport = httpsCallable(functions, 'filterFacilitiesBySport');
export const getAllListedSports = httpsCallable(functions, 'getAllListedSports');
export const getPaymentSheet = httpsCallable(functions, 'getPaymentSheet');
export const getCurrentOrders = httpsCallable(functions, 'getCurrentOrders');
export const getPastOrders = httpsCallable(functions, 'getPastOrders');
export const getLeaserPastOrderedListings = httpsCallable(functions, 'getLeaserPastOrderedListings');
export const getLeaserFutureOrderedListings = httpsCallable(functions,'getLeaserFutureOrderedListings');
export const createPaymentSheet = httpsCallable(functions, 'createPaymentSheet');  
export const getFacilitytListingsByUserUID= httpsCallable(functions, 'getFacilityListingsByUserUID');  
export const getEquipmentListingsByUserUID= httpsCallable(functions, 'getEquipmentListingsByUserUID'); 
export const deleteEquipmentById= httpsCallable(functions, 'deleteEquipmentById');  
export const deleteFacilityById= httpsCallable(functions, 'deleteFacilityById'); 
export const editEquipment= httpsCallable(functions, 'editEquipment');  
export const editFacility= httpsCallable(functions, 'editFacility'); 
export const getPaymentIdFromUserId=httpsCallable(functions, 'getPaymentIdFromUserId')
