import { Router } from 'express';
import authRouter from './auth.js';
import { Contact } from '../db/models/contact.js';

const router = Router();

router.use('/contacts', Contact);
router.use('/auth', authRouter);

export default router;
