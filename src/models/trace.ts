import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Trace = new Schema({
  IP: {
    type: String,
    required:true
  },
  Date: {
    type: Date,
    default: Date.now
  },
  trace:Object
})

export default mongoose.model('Trace', Trace)
