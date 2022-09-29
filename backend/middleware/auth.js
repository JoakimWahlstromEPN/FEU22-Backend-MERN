
const jwt = require('jsonwebtoken');
require('dotenv').config();


const secretKey = process.env.SECRET_KEY;

exports.generateToken = (user) => {
  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' })
  const exp = jwt.verify(token, secretKey).exp
  return { token, exp }
}
// Bearer ksajdn23ikjdnwaksjn2k3jfnwkasj
exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.userData = jwt.verify(token, secretKey);
    next();
  }
  catch {
    res.status(401)
    throw new Error('Access restricted, Please login!')
  }
}