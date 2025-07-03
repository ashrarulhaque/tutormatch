import express from "express";
import cors from "cors";
import dotenv, { populate } from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import {
  Teacher,
  Student,
  Review,
  Booking,
  User,
} from "./models/models_index.js";
import hashingPassword from "./utils/hashPassword.js";
import teacherRoutes from "./routes/teachers.js";
import bookingRoutes from "./routes/bookings.js";
// import authRoutes from './routes/auth.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URL = "mongodb://127.0.0.1:27017/tutor_match";

// Connect to MongoDB
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// --- Middleware
app.use(express.json()); // Allows Node.js to read JSON from React
// Configure CORS to allow credentials (cookies)
app.use(
  cors({
    origin: "http://localhost:5173", // <-- IMPORTANT: Your React app's origin
    credentials: true, // <-- IMPORTANT: Allow sending and receiving cookies
  })
);
app.use(cookieParser()); // <-- NEW: Use cookie-parser middleware

const JWT_SECRET = process.env.JWT_SECRET;

// --- Search Route
app.get("/api/search", async (req, res) => {
  try {
    const teacherInfo = await Teacher.find({}).populate({ path: "reviews" });
    res.json(teacherInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "fetchTeacher: Server error" });
  }
});

app.get("/api/booking", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Please log in to access your bookings" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { role, roleId } = decoded.user;
    let bookingInfo = [];

    if (role === "Teacher") {
      bookingInfo = await Booking.find({ teacherId: roleId }).populate([
        { path: "studentId" },
        {
          path: "teacherId",
          populate: {
            path: "reviews",
          },
        },
      ]);
    } else if (role === "Student") {
      bookingInfo = await Booking.find({ studentId: roleId }).populate(
        "teacherId"
      );
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }

    return res.json(bookingInfo);
  } catch (error) {
    console.error("Error in /api/booking:", error);
    return res
      .status(500)
      .json({ error: "Server error while fetching bookings" });
  }
});

// --- User Registration and auto login
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, gender, subjects, role } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "Email id already registered" });
    }

    const hashedPassword = await hashingPassword(password);

    // Dynamically choose model
    const RoleModel = role === "Student" ? Student : Teacher;

    const roleInstance = await RoleModel.create(req.body);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      role,
      roleId: roleInstance._id,
      roleModel: role,
    });

    const payload = {
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.name,
        role: newUser.role,
        roleId: newUser.roleId,
      },
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 3600000,
    });

    return res
      .status(201)
      .json({ message: "Registration successful and logged in!" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// --- User Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        email: user.email,
        username: user.name,
        role: user.role,
        roleId: user.roleId,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 3600000,
    });

    return res.status(201).json({ message: `Successful Login` });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/profile", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { role, roleId } = decoded.user;

    // Select model dynamically
    const RoleModel = role === "Student" ? Student : Teacher;

    let profile;

    if (role === "Teacher") {
      profile = await RoleModel.findById(roleId).populate("reviews");
    } else {
      profile = await RoleModel.findById(roleId); 
    }

    if (!profile) return res.status(404).json({ message: "Profile not found" });

    return res.status(200).json({ role, profile });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

// --- Logout Route ---
app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// Use routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/bookings", bookingRoutes);
// app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
