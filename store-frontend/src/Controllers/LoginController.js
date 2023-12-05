// import functions from '@react-native-firebase/functions';
// import { app, functions } from "@firebaseConfig.js"
import { login, auth, registerUser,getUserFunc } from '../../config/firebase';

export class LoginController {
  
  static async registerUser(email,username, password, passwordVerify) {


    const result = this.validateRegistrationInputs(email, password,passwordVerify);
    if (!result.success){
      return result.message;
    }
    
    try {
      const userData = {
        email: email,
        password: password,
        username: username
      };
      console.log("calling firebase register function");
      const registration = await registerUser(userData)
        console.log(registration.data.message);
      // Return success status
      if(registration.data.success == 'success'){
        return {
          success: true,
          message: 'Registration successful!',
          user,
        };
      }

    } catch (error) {
      // Handle specific error cases
      if (error.code === 'auth/invalid-email') {
        return {
          success: false,
          message: 'Invalid email format. Please provide a valid email address.',
        };
      } else {
        // Handle other error cases
        return {
          success: false,
          message: 'An unexpected error occurred during registration.',
        };
      }
    }
  }
  static validateRegistrationInputs(email, password, passwordVerify) {
    // Validate email
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    if (!validateEmail(email)) {
      return {
        success: false,
        message: 'Invalid Email!',
      };
    }

    // Verify password matching
    if (password != passwordVerify) {
      return {
        success: false,
        message: 'Passwords do not match!',
      };
    }

    // Validation passed
    return {
      success: true,
      message: 'Inputs are valid!',
    };
  }

  static loginUser = async (email, password) => {
    try {
      const userCredential = await login(auth, email, password);
      const userEmail = userCredential.user.providerData[0].email;
  
      // Checking if the user exists in the database
      const isRegisteredUser = await getUserFunc(email);
  
      if (isRegisteredUser.status === 'error') {
        console.log(isRegisteredUser.message);
        return {
          success: false,
          message: isRegisteredUser.message,
        };
      }
  
      console.log("Logged in!");
      return {
        success: true,
        message: 'Login successful',
        data: isRegisteredUser.data, // You might want to include user data in the response
      };
    } catch (error) {
      console.error('Error calling login function:', error);
      return {
        success: false,
        message: 'Internal Server Error',
      };
    }
  };
}
export default LoginController
