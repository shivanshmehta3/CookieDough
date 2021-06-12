import express from 'express';
import {
	addProduct,
	removeOne,
	getCart
} from '../handlers/cart';

const router = new express.Router();

router.post('/add', addProduct);
router.post('/removeOne', removeOne);
router.get('/get', getCart);

export default router;