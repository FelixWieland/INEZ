import { userInfo } from 'os'

export const getUsername = (req, res) => {
	return res.send({
		username: userInfo().username,
	})
}

export const demoCall = (req, res) => {
	console.log(req.body)
	res.send({
		jwt: 'demoJWT',
		status: 'ok',
		id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
	})
}
