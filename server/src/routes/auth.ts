import express from 'express'
import signUpUser from '../controllers/auth/sign-up'
import signInUser from '../controllers/auth/sign-in';
import signOutUser from '../controllers/auth/sign-out';
import signInWithGoogle from '../controllers/auth/sign-in-google';
import updateUser from '../controllers/auth/update-user';
import emailOtpSignIn from '../controllers/auth/email-otp-signin';
import phoneOtpSignIn from '../controllers/auth/phone-otp-signin';
import verifyOtpEmail from '../controllers/auth/verify-otp-email';
import verifyOtpPhone from '../controllers/auth/verify-otp-phone';
import getUserInfo from '../controllers/auth/get-user';

// need to add Twilio to do sms messages?

const authRoutes = express.Router();

authRoutes.post('/sign-up', signUpUser);
authRoutes.post('/sign-in', signInUser);
authRoutes.post('/sign-out', signOutUser)
authRoutes.post('/sign-in-google', signInWithGoogle);
authRoutes.post('/update-user', updateUser);
authRoutes.post('/email-otp-signin', emailOtpSignIn);
authRoutes.post('/phone-otp-signin', phoneOtpSignIn);
authRoutes.post('/verify-email-otp', verifyOtpEmail);
authRoutes.post('/verify-phone-otp', verifyOtpPhone);
authRoutes.get('/get-user', getUserInfo);

export default authRoutes;