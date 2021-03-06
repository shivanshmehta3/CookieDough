import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {Cookie} from './index';
import { statusValues, cookieColName,cookieDocName } from './CookieSchema';

const userDocName = 'User';

const colName = {
	EMAIL: 'EMAIL',
	NAME: 'NAME',
	PASSWORD: 'PASSWORD',
	CART: 'CART'
}

const cartColName = {
	PRODUCTS: 'PRODUCTS',
	SHIPPING_CHARGE_RS: 'SHIPPING_CHARGE_RS',
	TOTAL_AMOUNT_RS: 'TOTAL_AMOUNT'
};

const productColName = {
	QUANTITY: 'QUANTITY',
	ID: '_id'
};

const schemaObj = {
	[colName.EMAIL]: {
		type: String,
		required: true,
		unique: true
	},
	[colName.PASSWORD]: {
		type: String,
		required: true
	},
	[colName.NAME]: {
		type: String,
		required: true
	},
	[colName.CART]:{
		[cartColName.PRODUCTS]:[{
			[productColName.ID]:{
				type: mongoose.Schema.Types.ObjectId,
				ref: cookieDocName,
				required: true,
				unique: true
			},
			[productColName.QUANTITY]: {
				type: Number,
				required: true,
				default: 0
			}
		}],
		[cartColName.SHIPPING_CHARGE_RS]: {
			type: Number,
			default: 0
		},
		[cartColName.TOTAL_AMOUNT_RS]: {
			type: Number,
			default: 0
		}
	}
}

const modelSchema = new mongoose.Schema(schemaObj);

modelSchema.pre('findOneAndUpdate',async function(next){
	try{
		//check for product quantity increment condition
		const updatePath = `${colName.CART}.${cartColName.PRODUCTS}.$.${productColName.QUANTITY}`
		if(this._update.$inc && this._update.$inc[updatePath] == 1){
			//check the availability before adding an item to cart and update the total amount of cart
			const docToUpdate = await this.model.findOne(this.getQuery());
			let totalAmount = 0;
			let requiredQuantity = 0;

			const productIdPath = `${colName.CART}.${cartColName.PRODUCTS}`
			const requiredProductId = this._conditions[productIdPath].$elemMatch[productColName.ID];

			if(docToUpdate) {
				totalAmount = docToUpdate[colName.CART][cartColName.TOTAL_AMOUNT_RS];
				requiredQuantity = docToUpdate[colName.CART][cartColName.PRODUCTS].filter(obj => {return (String(obj[productColName.ID]) == String(requiredProductId))})[0][productColName.QUANTITY] + 1;
			}
			
			const product = await Cookie.findOne({
				_id: requiredProductId
			});
			
			// //validate the availability
			const productStatus = product[cookieColName.STATUS];
			const productInStockQuantity = product[cookieColName.QUANTITY_IN_STOCK];

			if(productStatus === statusValues[0] && requiredQuantity <= productInStockQuantity){
			// 	//if available update the total amount
				const productPriceRs = product[cookieColName.PRICE_RS];
				const totalAmountPath = `${colName.CART}.${cartColName.TOTAL_AMOUNT_RS}`
				totalAmount += productPriceRs;
				this.set({[totalAmountPath]: totalAmount});
			}
			else{
				//if not available throw an error
				const err = docToUpdate.invalidate([productColName.QUANTITY], 'Product if finished', requiredQuantity);
				next(err);
			}
		}
		//check for product quantity decrement condition
		else if((this._update.$inc && this._update.$inc[updatePath] == -1) || (this._update.$pull && this._update.$pull[`${colName.CART}.${cartColName.PRODUCTS}`])){
			const docToUpdate = await this.model.findOne(this.getQuery());
			console.log('prehook',this, docToUpdate);
			let totalAmount = 0;

			const productIdPath = `${colName.CART}.${cartColName.PRODUCTS}`
			const requiredProductId = this._conditions[productIdPath].$elemMatch[productColName.ID];

			if(docToUpdate) {
				totalAmount = docToUpdate[colName.CART][cartColName.TOTAL_AMOUNT_RS];
				// requiredQuantity = docToUpdate[colName.CART][cartColName.PRODUCTS].filter(obj => {return (String(obj[productColName.ID]) == String(requiredProductId))})[0][productColName.QUANTITY] + 1;
			}

			const product = await Cookie.findOne({
				_id: requiredProductId
			});

			const productPriceRs = product[cookieColName.PRICE_RS];
			const totalAmountPath = `${colName.CART}.${cartColName.TOTAL_AMOUNT_RS}`
			totalAmount -= productPriceRs;
			this.set({[totalAmountPath]: totalAmount});
			console.log(productPriceRs, totalAmount)
		}
	}
	catch(error){
		return next(error);
	}
});

modelSchema.pre('save', async function(next){
	try{
		if(!this.isModified([colName.PASSWORD])){
			return next();
		}
		const saltRounds = 9211420420;
		let hashedPassword = await bcrypt.hash(this[colName.PASSWORD], saltRounds);
		this[colName.PASSWORD] = hashedPassword;
		console.log('hi1',this);
		return next();
	}
	catch(err){
		return next(err);
	}
});

modelSchema.methods.comparePassword = async function(inputPassword, next){
	try{
		const savedPassword = this[colName.PASSWORD];
		let isMatched = await bcrypt.compare(inputPassword, savedPassword)
		return isMatched;
	}
	catch(error){
		return next(error);
	}
}

const User = mongoose.model(userDocName, modelSchema);

export default User;
export {colName, userDocName, cartColName, productColName};