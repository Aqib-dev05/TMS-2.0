import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error("Mongo connection string is missing");
  }

  mongoose.set("strictQuery", true);

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connected successfully!`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Port: ${conn.connection.port}`);
    console.log(`   State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    return conn;
  } catch (error) {
    console.error("❌ Mongo connection error:", error.message);
    throw error;
  }
};

export default connectDB;

