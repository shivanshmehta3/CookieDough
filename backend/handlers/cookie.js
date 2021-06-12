import {Cookie} from '../models';
import {categoryNames, cookieColName, statusValues} from '../models/CookieSchema';

async function addCookie (req, res, next){
	try{
		let val= req.body;
		console.log(val)
		const cookie = await Cookie.create(req.body);
		res.status(200).json(cookie);
	}
	catch(error){
		if(error.code && error.code === 11000){
			const customMessage = `NAME already exists, duplicate field is not allwed`;
			return next({
				status: 400,
				message: customMessage
			});
		}
		else if(error.errors.CATEGORY && error.errors.CATEGORY.kind === 'enum' && error.errors.CATEGORY.path === colName.CATEGORY){
			const customMessage = `${error._message}: '${colName.CATEGORY}' should be any of these: ${categoryNames}`;
			return next({
				status: 400,
				message: customMessage
			});
		}
		else if(error.errors.CATEGORY && error.errors.CATEGORY.kind === 'enum' && error.errors.CATEGORY.path === colName.STATUS){
			const customMessage = `${error._message}: '${colName.STATUS}' should be any of these: ${statusValues}`;
			return next({
				status: 400,
				message: customMessage
			});
		}
		else {
			return next({
				status: 400,
				message: error.message
			});
		}
	}
}

async function getCookies(req, res, next){
	try{
		console.log('requested');
		const cookies = await Cookie.find({});
		res.status(200).json(cookies);
	}
	catch(error){
		return next({
			status: 400,
			message: error.message
		});
	}
}

async function getCategories(req, res, next){
	console.log('hii');
	try{
		res.status(200).json({
			categoryNames
		});
	}
	catch(error){
		return next({
			status: 400,
			message: error.message
		});
	}
}

async function editCookie(req, res, next){
	try{
		const filter = {
			_id: req.body.id
		};
		let update = {...(req.body)};
		delete update.id;
		const options = {
			new: true,
		};
		
		const cookie = await Cookie.findOneAndUpdate(filter, update, options);
		console.log('hi', cookie);
		res.status(200).json(cookie);
	}
	catch(error){
		return next({
			status: 400,
			message: error.message
		});
	}
}

async function deleteCookie(req, res, next){
	try{
		const filter = {
			_id: req.body.id
		};
		const cookie = await Cookie.deleteOne(filter);
		res.status(200).json(cookie);
	}
	catch(error){
		return next({
			status: 400,
			message: error.message
		});
	}
}

export {addCookie, getCookies, editCookie, deleteCookie, getCategories};