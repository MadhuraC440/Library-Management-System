import mongoose from 'mongoose'

const category=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})

export default mongoose.model('category',category)