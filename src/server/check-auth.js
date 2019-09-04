const jwt = require('jsonwebtoken')

export const checkAuth = (req, res, next) => {
	try {
		// const token = req.headers.authorization.split(" ")[1];
		const token = req.query.jwt.split(' ')[1]
		const decoded = jwt.verify(token, process.env.JWT_KEY)
		req.userData = decoded
		next()
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({
				message: 'Token expired!',
				action: 'refresh_token',
			})
			return
		}

		console.log(error)
		return res.status(401).json({
			message: 'Auth failed!',
			action: 'login',
		})
	}
}
