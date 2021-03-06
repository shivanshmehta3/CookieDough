import {User} from '../models';
import mongoose from 'mongoose';
import 
{
	colName,
	cartColName, 
	productColName
} from '../models/UserSchema';

async function addProduct(req, res, next){
	try{
		console.log('h',req.params);
		const user_id = res.locals.userId;
		const product_id = mongoose.Types.ObjectId(req.body.id);

		//check if product is already in cart
		let filterPath = `${colName.CART}.${cartColName.PRODUCTS}.${productColName.ID}`
		let filter = {
			'_id': user_id,
			[filterPath]: product_id
		}

		const isProductInCart = await User.findOne(filter) != null ? true : false;

		filter = {
			'_id': user_id
		}
		let options ={
			new: true,
			upsert: true,
			runValidators: true,
			context: 'query'
		}
		//insert a product if not available
		if (!isProductInCart) {
			let updatePath = `${colName.CART}.${cartColName.PRODUCTS}`;
			let update = {
				$push:{
					[updatePath]:{
						[productColName.ID]: product_id,
					}
				}
			}

			await User.findOneAndUpdate(filter, update, options);
		}
		filterPath = `${colName.CART}.${cartColName.PRODUCTS}`
		filter = {
			'_id': user_id,
			[filterPath]:{
				$elemMatch: {
					[productColName.ID]: product_id
				}
			}
		}
		let updatePath = `${colName.CART}.${cartColName.PRODUCTS}.$.${productColName.QUANTITY}`;
		//increase the quantity of the product
		let update = {
			$inc:{
				[updatePath]: 1
			}
		}
		const projection = {
			[`${colName.CART}.${cartColName.PRODUCTS}`]:1,
			[`${colName.CART}.${cartColName.SHIPPING_CHARGE_RS}`]:1,
			[`${colName.CART}.${cartColName.TOTAL_AMOUNT_RS}`]:1
		}
		options ={
			projection,
			new: true,
			upsert: true,
			runValidators: true,
			context: 'query'
		}
		let product = await User.findOneAndUpdate(filter, update, options);
		res.status(200).json(product);
	}
	catch(error){
		return next({
			status:400,
			message: error.message
		})
	}
}

async function removeOne(req, res, next){
	try{
		const product_id = mongoose.Types.ObjectId(req.body.id);
		const user_id = res.locals.userId;

		let filterPath = `${colName.CART}.${cartColName.PRODUCTS}`
		const filter = {
			'_id': user_id,
			[filterPath]:{
				$elemMatch: {
					[productColName.ID]: product_id
				}
			}
		}
		const projection = {
			[`${colName.CART}.${cartColName.PRODUCTS}`]:1,
			[`${colName.CART}.${cartColName.SHIPPING_CHARGE_RS}`]:1,
			[`${colName.CART}.${cartColName.TOTAL_AMOUNT_RS}`]:1
		}
		const options = {
			projection,
			new: true
		};
		
		const result = await User.findOne(filter);
		if(!result){
			throw new Error("Product is not present in cart.");
		}
		let cart = result[colName.CART]; 
		const productQuantityInCart = cart[cartColName.PRODUCTS][0][productColName.QUANTITY];
		console.log('removefunc' ,productQuantityInCart);
		if(productQuantityInCart > 1){
			const updatePath = `${colName.CART}.${cartColName.PRODUCTS}.$.${productColName.QUANTITY}`;
			const update = {
				$inc:{
					[updatePath]: -1
				}
			};
			cart = await User.findOneAndUpdate(filter, update, options);
		}
		else if(productQuantityInCart == 1){
			const updatePath = `${colName.CART}.${cartColName.PRODUCTS}`;
			const update = {
				$pull:{
					[updatePath]:{
						[productColName.ID]: product_id
					}
				}
			};

			cart = await User.findOneAndUpdate(filter, update, options);
		}
		res.status(200).json(cart);
	}
	catch(error){
		return next({
			status:400,
			message: error.message
		})
	}
}

async function getCart(req, res, next){
	try{
		const user_id = res.locals.userId;
		const filter = {
			'_id': user_id
		}
		const projection = {
			[`${colName.CART}.${cartColName.PRODUCTS}`]:1,
			[`${colName.CART}.${cartColName.SHIPPING_CHARGE_RS}`]:1,
			[`${colName.CART}.${cartColName.TOTAL_AMOUNT_RS}`]:1
		}
		const cart = await User.findOne(filter, projection);
		res.status(200).json(cart);
	}
	catch(error){
		return next({
			status:400,
			message: error.message
		})
	}
}

export {addProduct, removeOne, getCart};