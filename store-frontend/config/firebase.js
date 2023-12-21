import { getApp, initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

//DONT CHANGE
const firebaseConfig = {
  apiKey: "AIzaSyBpCJtHqad3BnKh9PKURBVHQp7I6ykFCO0",
  authDomain: "sportyrental.firebaseapp.com",
  projectId: "sportyrentals",
  messagingSenderId: "79967591982 ",
  appId: "1:79967591982:android:f7f82758c2bc30443c09bf",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions();
//For firebase emulator
//connectFunctionsEmulator(functions, "127.0.0.1", 50001)


export const registerUser = httpsCallable(functions, 'registerUser');
export const getUserFunc = httpsCallable(functions, 'getUser');
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const login = signInWithEmailAndPassword;
export const postEquipment = httpsCallable(functions,'postEquipment');
export const postFacility = httpsCallable(functions, 'postFacility');
export const getListingsByUserUid = httpsCallable(functions, 'getListingsByUserUid');
export const getEquipmentById = httpsCallable(functions,'getEquipmentById');
export const getFacilityById = httpsCallable(functions,'getFacilityById');
export const postOrder = httpsCallable(functions, 'postOrder');