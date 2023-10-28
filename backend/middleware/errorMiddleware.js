export const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originurl}`);
	res.status(404);
	next(error);
};

export const errHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.Node_ENV === "production" ? null : err.stack,
	});
};
