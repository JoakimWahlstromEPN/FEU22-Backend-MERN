const User = require('../schemas/userSchema');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');


// POST - /api/users/register
exports.registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    res.status(400)
    throw new Error('You need to enter all the fields')
  }

  const userExists = await User.exists({ email })

  if(userExists) {
    res.status(400)
    throw new Error('This user already exists')
  }

  const salt = await bcrypt.genSalt(13);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if(!user) {
    throw new Error('Something went wrong')
  }

  const {token, exp} = auth.generateToken(user)

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
    exp
  })

})


// POST - /api/users/login
exports.loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400)
    throw new Error('authentication failed')
  }

  const {token, exp} = auth.generateToken(user)

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
    exp
  })

})