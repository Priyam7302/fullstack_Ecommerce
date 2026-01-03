import Auth from "../models/Auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

/* =========================
   GET ALL USERS
========================= */
export async function getUsers(req, res) {
  try {
    const users = await Auth.find().select("-password");
    if (!users.length)
      return res.status(404).json({ message: "No users found" });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

/* =========================
   REGISTER USER (LOCAL)
========================= */
export async function registerUser(req, res) {
  try {
    const data = req.body;

    data.password = await bcrypt.hash(data.password, 10);
    data.role = "user";
    data.authProvider = "local";

    const user = new Auth(data);
    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `${field} already exists`,
      });
    }
    return res.status(500).json({ message: "Server Error" });
  }
}

/* =========================
   LOGIN USER (LOCAL)
========================= */
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // 🔒 BLOCK CHECK
    if (user.isBlocked) {
      return res
        .status(403)
        .json({ message: "Your account has been blocked by admin" });
    }

    if (user.authProvider !== "local") {
      return res.status(400).json({ message: "Please login using Google" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.SECURE === "true",
      sameSite: process.env.SAMESITE || "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      message: "Login successful",
      user: { ...user._doc, password: undefined },
    });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
}


/* =========================
   LOGOUT
========================= */
export async function logoutUser(req, res) {
  res.cookie("auth_token", "", {
    httpOnly: true,
    secure: process.env.SECURE === "true",
    sameSite: process.env.SAMESITE || "lax",
    maxAge: -1,
    path: "/",
  });

  return res.status(200).json({ message: "Logged out successfully" });
}

/* =========================
   DELETE USER
========================= */
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Auth.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

/* =========================
   UPDATE USER
========================= */
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updatedRecord = req.body;

    if (updatedRecord.password) {
      updatedRecord.password = await bcrypt.hash(updatedRecord.password, 10);
    }

    const updatedUser = await Auth.findByIdAndUpdate(id, updatedRecord, {
      new: true,
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function toggleBlockUser(req, res) {
  try {
    const { id } = req.params;

    const user = await Auth.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent blocking admin
    if (user.role === "admin") {
      return res.status(403).json({ message: "Admin cannot be blocked" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    return res.status(200).json({
      message: user.isBlocked ? "User blocked" : "User unblocked",
      isBlocked: user.isBlocked,
    });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
}
