import express from 'express';
import libRouter from './lib';
import authRouter from './auth';

const router = express.Router();

router.use('/books', libRouter);
router.use('/auth', authRouter);

export default router;




