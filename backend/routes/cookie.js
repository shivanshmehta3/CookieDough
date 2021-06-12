import express from 'express';
import {
	addCookie,
	getCookies,
	editCookie,
	deleteCookie,
	getCategories
} from '../handlers/cookie'
import { categoryNames } from '../models/CookieSchema';

const router = new express.Router();

router.post('/add', addCookie);
router.get('/getAll', getCookies);
router.post('/edit', editCookie);
router.delete('/delete', deleteCookie);
router.get('/categories', getCategories);

export default router;