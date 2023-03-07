import mongoose from 'mongoose'

let mongostring: string

const uri_DB = process.env.URI_DB
switch (process.env.NODE_ENV) {
  case 'prod':
    mongostring = 'mongodb://' + uri_DB + '/Traces?retryWrites=true&w=majority'
    break
  case 'dev':
    mongostring = 'mongodb://' + uri_DB + '/?readPreference=primary&ssl=false'
    break
    case 'ServerCode':
      mongostring = ''+ uri_DB
      break
  default:
    mongostring = 'mongodb://127.0.0.1:27017/Traces?retryWrites=true&w=majority'
    break
}

async function dbconnect() {
  try {
    console.log('mongostring : ', mongostring)
    const result = await mongoose.connect(mongostring)
  } catch (e) {
    console.error(e)
  }
  //console.log(result)
  return mongoose.connection
}

function dbclose() {
  return mongoose.disconnect()
}

export default { dbconnect, dbclose, mongostring }
