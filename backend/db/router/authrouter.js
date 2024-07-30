import express from 'express';
import { signup,login,logout } from '../../controllers/authcontroller.js';

const router = express.Router();

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)
export default router;