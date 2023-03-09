import User from '../models/user'
import bcrypt from 'bcrypt'

export async function createUser(email: String, password: String) {
  console.log('create a user', email, password )
  //check if user already exists
  const existuser = await User.findOne({ email: email })
  if (existuser) {
    return Promise.reject('user already exists')
  }
  //create a new user
  const hashedPassword = await hashPassword(password)
  const token = randomString()
  const newUser = new User({
    email: email,
    password: hashedPassword,
    validationToken: token,
  })
  try {
    await newUser.save()
    return Promise.resolve(cleanUserObject(newUser))
  } catch (e) {
    console.error('error in service')
    return Promise.reject(e)
  }
  
}

//function to validate a user
export async function validateUser(email:String, token: String) {
  const user = await User.findOne({ email: email, validationToken: token })
  if (user) {
    user.validated = true
    await user.save()
    return cleanUserObject(user)
  }
}

export async function login(email: String, password: String) {
  console.log('login', email, password )
  const user = await User.findOne({ email: email })
  if (user) {
    if (user.validated) {
      console.log('before check password')
      const validPassword = await bcrypt.compare(password.toString(), user.password)
      console.log('validPassword', validPassword)
    if (validPassword) {
      return Promise.resolve(cleanUserObject(user))
    } else {
      return Promise.reject('wrong credential')
    }
    } else {
      return Promise.reject('user not validated')
    }
    
  }
}

//function to create a random string
function randomString() {
  return Math.random().toString(36).slice(-8);
}


//function to hash a password
async function hashPassword(password: String) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password.toString(), salt);
}

function cleanUserObject(user: any) {
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.validationToken
  return userObject
}