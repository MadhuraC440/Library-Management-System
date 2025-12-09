import mongoose from 'mongoose'

const schema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

export default mongoose.model('student',schema)
