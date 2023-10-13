export class LoginController {
  constructor() {
    //this.authService = new AuthService();
  }

  async login(email, password) {
    try {
      
   //   const user = await this.authService.loginWithEmailAndPassword(email, password);

      // Handle successful login
      return user;
    } catch (error) {
      // Handle login errors
      throw error;
    }
  }
}
export default LoginController
