// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpCJtHqad3BnKh9PKURBVHQp7I6ykFCO0",
  authDomain: "sportyrental.firebaseapp.com",
  projectId: "sportyrentals",
  messagingSenderId: "79967591982 ",
  appId: "1:79967591982:android:f7f82758c2bc30443c09bf",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions();

export const registerUser = httpsCallable(functions, 'registerUser');
export const getUserFunc = httpsCallable(functions, 'getUser');
export const auth = getAuth();
export const login = signInWithEmailAndPassword;