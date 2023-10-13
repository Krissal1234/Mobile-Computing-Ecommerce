//import { FIREBASE_AUTH } from "../../../store-backend/firebase/firebaseConfig";

export class AuthModel {
  async loginWithEmailAndPassword(email, password) {
    try {
        //
      const userCredential = await FIREBASE_AUTH.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
}
