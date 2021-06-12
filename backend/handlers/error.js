function handleError(err, req, res, next){
	res.status(err.status);
	res.json({message: err.message, err});
}

module.exports = handleError;