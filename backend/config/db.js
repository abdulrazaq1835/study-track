import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connectDB =  async ()=>{
   try {
      const url =  process.env.MONGO_URI
    const connection =  await mongoose.connect(url)

    console.log(`mongodb connected successfully ${connection.connection.host}`) 
   } catch (error) {
      console.log("erroee in monogo",error)
   }

}

export default connectDB