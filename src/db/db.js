import mongoose from "mongoose";
mongoose.set("strictQuery", true);
async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect mongoose successfully", 200);
    return connection;
  } catch (error) {
    console.log("Error while connecting", error);
  }
}
export default connect;
