import mongoose from 'mongoose'

const dbconnect=async()=>{
 
    try{
        await mongoose.connect("mongodb+srv://madspringboot:G1n8eiYl8Qa0CxC0@springbootcluster.9ecnqut.mongodb.net/library?appName=SpringBootCluster")
        console.log("MongoDB Connection Successfull!")
    }
    catch(error)
    {
        console.log("MongoDB not connected\n"+error)
    }
}
export default dbconnect