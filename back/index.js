const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const commentRoutes = require("./routes/comments");
const favRoutes=require('./routes/favoriteRoutes')
const propertymodel=require('./models/property')
const adminRoutes = require("./routes/adminRoutes");
const userModel = require("./models/user");




dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use('/api/favorites',favRoutes)
app.use("/api/admin/property", adminRoutes);

app.get("/api/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await userModel.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/api/property',async(req,res)=>{
  const data=await propertymodel.find()
  res.json(data)
})
app.get('/api/property/:id',async(req,res)=>{
  const id=req.params.id
  const data=await propertymodel.findOne({_id:id})
  res.json(data)

})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
