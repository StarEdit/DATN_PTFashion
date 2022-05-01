import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("connect success");
  } catch (error) {
    console.log("connect fail");
    process.exit(1);
  }
};

export default connectDB;
