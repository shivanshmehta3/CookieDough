import mongoose from 'mongoose';

const cookieDocName = 'Cookie';
const cookieColName = {
	NAME: 'NAME',
	PRICE_RS: 'PRICE_RS',
	DESCRIPTION: 'DESCRIPTION',
	MORE_DETAILS: 'MORE_DETAILS',
	CATEGORY: 'CATEGORY',
	STATUS: 'STATUS',
	QUANTITY_IN_STOCK: 'QUANTITY_IN_STOCK'
};

const categoryNames = ['Simple', 'Invention and Inspired', 'Gourmet', 'Luxury'];
const statusValues = ['Available', 'Out of Stock', 'Coming Soon'];

const schemaObj = {
	[cookieColName.NAME]:{
		type: String,
		required: true,
		unique: true
	},
	[cookieColName.PRICE_RS]:{
		type: Number,
		required: true
	},
	[cookieColName.DESCRIPTION]:{
		type: String,
		required: true
	},
	[cookieColName.MORE_DETAILS]:{
		type: String,
		required: true
	},
	[cookieColName.CATEGORY]:{
		type: String,
		required: true,
		enum: categoryNames
	},
	[cookieColName.STATUS]:{
		type: String,
		required: true,
		enum: statusValues,
		default: statusValues[0]
	},
	[cookieColName.QUANTITY_IN_STOCK]:{
		type: Number,
		required: true,
		default: 1
	}
}

//auto status change

const modelSchema = new mongoose.Schema(schemaObj);
const Cookie = mongoose.model(cookieDocName, modelSchema);

export default Cookie;
export {cookieColName, categoryNames, statusValues, cookieDocName};