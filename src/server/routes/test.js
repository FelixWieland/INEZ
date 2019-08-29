import { userInfo } from 'os';

export const getUsername = (req, res) => {
    return res.send({
        username: userInfo().username
    });
}

export const demoCall = (req, res) => {
    console.log(req.body)
    res.send({ status: "ok" })
}