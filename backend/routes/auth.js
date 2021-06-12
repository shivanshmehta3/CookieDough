import express from 'express';
import {signIn, signOut, signUp} from '../handlers/auth';

const router = new express.Router();

router.post('/signIn', signIn);
router.get('/signOut', signOut);
router.post('/signUp', signUp);

export default router;