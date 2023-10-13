import { FIREBASE_ENV } from '@env';
import { initializeApp, getAuth } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

let FIREBASE_APP; 

//if(!FIREBASE_APP){
   // if (FIREBASE_ENV === 'development') {
        // Emulator Configuration
        const firebaseConfig = {
          apiKey: 'AIzaSyBpCJtHqad3BnKh9PKURBVHQp7I6ykFCO0',
          authDomain: 'sportyrental.firebaseapp.com',
          projectId: 'sportyrentals',
          storageBucket: 'YOUR_STORAGE_BUCKET',
          messagingSenderId: '79967591982 ',
          appId: 'sportyrentals',
          measurementId: 'YOUR_MEASUREMENT_ID',
          databaseURL: 'http://127.0.0.1:8080 ', // Emulator host and port
        };
        FIREBASE_APP = initializeApp(firebaseConfig);
    //  } else {
        // Production Configuration
        // const firebaseConfig = {
        //   apiKey: 'AIzaSyBpCJtHqad3BnKh9PKURBVHQp7I6ykFCO0',
        //   authDomain: 'sportyrental.firebaseapp.com',
        //   projectId: 'sportyrentals',
        //   storageBucket: 'PRODUCTION_STORAGE_BUCKET',
        //   messagingSenderId: '79967591982 ',
        //   appId: 'PRODUCTION_APP_ID',
        //   measurementId: 'PRODUCTION_MEASUREMENT_ID',
        // };
        // FIREBASE_APP = initializeApp(firebaseConfig);
    //  }
//}


// Export Firebase services
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_AUTH, FIREBASE_DB };
