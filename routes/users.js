require('dotenv').config()
const router = require("express").Router()
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser')
const jwtGenerator = require('../utils/jwtGenerator')

const User = require("../models/User")
const validate = require('../middleware/validate')
const authorize = require('../middleware/authorize')

const maxAge = 7*24*3600*1000



router.get("/auth", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({error: "Ошибка сервера", success: false});
  }
})


router.get("/info", authorize, async (req, res) => {
  try {
    const user_id = req.user
    const user = await User.findById({_id: user_id})
  if(user){
    const {username, email} = user
    res.status(200).json({success: true, user: {username, email}, message: 'Поиск информации о пользователе'})
  }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({error: "Ошибка сервера", success: false});
  }
})

router.post("/register", validate ,async (req, res) => {
try {
const { username, email, password } = req.body
const userExists = await User.findOne({email: email})
if(userExists){
res.status(401).json({error:"Пользователь уже существует", success:false})
}
else{
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt);



const newUser = new User({
username: username,
email: email,
password: hashedPassword,
});



const user = await newUser.save()
const token = jwtGenerator(user._id)



res.cookie('travel_journal_jwt', token, { httpOnly: true, maxAge: maxAge })

res.status(200).json({success: true, message: "Вы зарегестрированы"})
}
} catch (err) {
  console.log(err)
  res.status(500).json({ error:"Ошибка сервера", success: false})
}
})




router.post("/login", validate, async (req, res) => {
try {
const { email, password } = req.body
const user = await User.findOne({ email: email })
if(!user){
res.status(401).json({error: "Incorrect username or password", success: false})
}


const validPassword = await bcrypt.compare(
password,
user.password
)
if(!validPassword){
res.status(401).json({error: "Incorrect username or password", success: false})
}



const token = jwtGenerator(user._id)
res.cookie('travel_journal_jwt', token, { httpOnly: true, maxAge: maxAge })

res.status(200).json({ message:"User signed in", success: true})
} catch (err) {
console.error(err.message)
res.status(500).json({error:"Server Error", success: false})
}
})

router.get('/logout', async(req, res) => {
  try {
    res.cookie('travel_journal_jwt', '', { maxAge: 1 })
    res.status(201).json("User signed out")
  } catch (error) {
    res.status(500).json({error: "Server Error", success: false})
  }
})


module.exports = router;