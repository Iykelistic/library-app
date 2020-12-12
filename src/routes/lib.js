import express from 'express';
import { getBooks, getBook, addBook, updateBook, deleteBook, } from '../controllers/lib';
import { addreview, getReview, updateReview, deleteReview } from '../controllers/reviews';
import middlewares from '../middlewares';
import { reviewValidate } from '../middlewares/validation';
import upload from '../upload';

const { checkBook, checkId, validateBook, tokenValidate, } = middlewares;

const libRouter = express.Router();

libRouter.get('/',tokenValidate, getBooks);
libRouter.get('/:id', checkId, checkBook, getBook);
libRouter.post('/', tokenValidate, upload.single('image'), validateBook, addBook);
libRouter.patch('/:id', checkId, upload.single('image'), checkBook, updateBook, );
libRouter.delete('/:id', checkId, checkBook, deleteBook);
libRouter.post('/:id/reviews', tokenValidate, checkId, reviewValidate, addreview);
libRouter.get('/:id/reviews', tokenValidate, checkId, getReview);
libRouter.patch('/:id/reviews', tokenValidate, checkId, reviewValidate, updateReview);
libRouter.delete('/:id/reviews', tokenValidate, checkId, deleteReview)


export default libRouter;