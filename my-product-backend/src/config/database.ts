import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connesso 🚀");
  } catch (error) {
    console.error("Errore connessione DB", error);
    process.exit(1);
  }
};
