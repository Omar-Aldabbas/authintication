import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const connect = async () => {
  try {
    const mongod = await MongoMemoryServer.create({
      binary: {
        version: "7.0.3",
      },
    });
    const getUri = mongod.getUri();

    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(getUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database Connected");
    return db;
  } catch (err) {
    console.error("❌ Database connection error:", err);
    throw err;
  }
};
