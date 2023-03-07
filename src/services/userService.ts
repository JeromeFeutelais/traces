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
    return Promise.resolve(newUser)
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
    return user.save()
  }
}

export async function login(email: String, password: String) {
  console.log('login', email, password )
  const user = await User.findOne({ email: email })
  if (user) {
    if (user.validated) {
      const validPassword = await bcrypt.compare(password.toString(), user.password)
    if (validPassword) {
      return Promise.resolve(user)
    } else {
      return Promise.reject('wrong password')
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
