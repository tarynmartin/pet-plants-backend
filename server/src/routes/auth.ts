import express from 'express'
import signUpUser from '../controllers/auth/sign-up'
import signInUser from '../controllers/auth/sign-in';
import signOutUser from '../controllers/auth/sign-out';
import signInWithGoogle from '../controllers/auth/sign-in-google'

const authRoutes = express.Router();

authRoutes.post('/sign-up', signUpUser);
authRoutes.post('/sign-in', signInUser);
authRoutes.post('/sign-out', signOutUser)
authRoutes.post('/sign-in-google', signInWithGoogle);

export default authRoutes;