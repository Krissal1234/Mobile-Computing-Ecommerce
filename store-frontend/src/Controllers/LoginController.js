// import functions from '@react-native-firebase/functions';
// import { app, functions } from "@firebaseConfig.js"
import { login, auth, registerUser,getUserFunc } from '../../config/firebase';

export class LoginController {
  
  static async registerUser(email,username, password, passwordVerify) {


    const result = this.validateRegistrationInputs(email, password,passwordVerify);
    if (!result.success){
      console.log("success is false if");
      return result.message;
    }
    
    try {
      const userData = {
        email: email,
        password: password,
        username: username
      };
      const registration = await registerUser(userData)
      // Return success 
      if(registration.data.success == true){
        return {
          success: true,
          message: 'Registration successful!',
        };
      }else if(registration.data.success == false){
          return {
            success: false,
            message: registration.data.message
          }
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
      // Check input validity
      if (!email || !password) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      // Authenticate user
      const userCredential = await login(auth, email, password);

      // Log successful login
      console.log(`User ${email} logged in successfully`);

      // Fetch additional user data if needed
      // const userData = await getUserFunc(email);

      return {
        success: true,
        message: 'Login successful',
        user: userCredential        // Include user data if needed
        // userData: userData.data,
      };
    } catch (error) {
      console.error('Error calling login function:', error);

      // Handle specific authentication errors
      let errorMessage = 'Internal Server Error';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      }
      
      return {
        success: false,
        message: errorMessage,
      };
    }
  };
}
export default LoginController
