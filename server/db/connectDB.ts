// mongo-password=K9rDy3Av8KUWdSah
// mongo-username=sanjaysolanki17om

import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('mongoDB connected.')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB