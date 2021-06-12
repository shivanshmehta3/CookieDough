import jwt from 'jsonwebtoken';
// require('dotenv').load();


//authenticate
function isLoggedIn(req, res, next){
	try{
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
			if(decode){
				return next();
			}
			else{
				return next({
					status: 401,
					message: 'Please login first'
				});
			}
		});
	}
	catch(error){
		return next({
			status: 401,
			message: 'Please login first'
		});
	}
}

//authorize
function isCorrectUser(req, res, next){
	try{
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
			if(decode && decode.id == req.params.id){
				res.locals.userId = decode.id;
				return next();
			}
			else{
				return next({
					status: 401,
					message: 'Unauthorized'
				});
			}
		});
	}
	catch(error){
		return next({
			status: 401,
			message: 'Unauthorized'
		});	
	}
}

export {isLoggedIn, isCorrectUser};