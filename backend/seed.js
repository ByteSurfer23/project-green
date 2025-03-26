const mongoose = require("mongoose");
const User = require("./schema/UserSchema");

mongoose.connect("mongodb+srv://sjabezsam:hsbuFnlH34RKrjdF@cluster0.eg2ir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const seedAdmin = async () => {
  try {
    // const existingUser = await User.findOne({ username: "admin" });
    // if (existingUser) {
    //   console.log("Admin already exists!");
    // } else {
      const admin = new User({ username: "user3", password: "user3" });
      await admin.save();
      console.log("Admin user created!");
    //}
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
