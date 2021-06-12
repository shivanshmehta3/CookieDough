import {User} from '../models';
import {colName} from '../models/UserSchema';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({path: '../../env'});

const JWT_COOKIE_NAME = 'jwt';
const MAX_TOKEN_AGE_SEC = 28800;

const signIn = async function(req, res, next){
	try{
		const user = await User.findOne({[colName.EMAIL]: req.body[colName.EMAIL]});
		
		const isMatched = await user.comparePassword(req.body[colName.PASSWORD]);
		
		if(isMatched){
			const token = jwt.sign({
				id: user.id,
				[colName.EMAIL]: user[colName.EMAIL],
				[colName.NAME]: user[colName.NAME]
			},process.env.SECRET_KEY);
			console.log(token);
			res.status(200).cookie(
				JWT_COOKIE_NAME,
				token,
				{
					httpOnly: true,
					maxAge: MAX_TOKEN_AGE_SEC
				}
			).json({
				id: user.id,
				[colName.EMAIL]: user[colName.EMAIL],
				[colName.NAME]: user[colName.NAME]
			});
		}
		else{
			return next({
				status: 400,
				message: 'Invalid Email/Password.'
			})
		}
	}
	catch(error){
		return next(error);
	}
};
const signOut = async function(req, res, next){
	console.log('sining_out');
	res.status(200).cookie(JWT_COOKIE_NAME,'null',{maxAge: 1}).send('success!');
};
const signUp = async function(req, res, next){
	try{
		const user = await User.create(req.body);
		const token = jwt.sign({
			id: user.id,
			[colName.EMAIL]: user[colName.EMAIL],
			[colName.NAME]: user[colName.NAME]
		},process.env.SECRET_KEY,{
			expiresIn: MAX_TOKEN_AGE_SEC
		});
		
		res.status(200).cookie(
			JWT_COOKIE_NAME,
			token,
			{
				httpOnly: true,
			   	maxAge: MAX_TOKEN_AGE_SEC
			}).json({
			id: user.id,
			[colName.EMAIL]: user[colName.EMAIL],
			[colName.NAME]: user[colName.NAME]
		});
	}
	catch(error){
		if(error.code == 11000){
			error.message = "EMAIL already exists, duplicate field is not allowed"
		}
		return next({
			status: 400,
			message: error.message
		});
	}
};

export {signIn, signOut, signUp};