import Auth from '../models/Auth.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import "dotenv/config";

export async function loginAdmin(req, res) {
    try {
        const data = req.body;
        const user = await Auth.findOne({ email: data.email });
        if (!user) return res.status(404).json({ message: "Email not found" });

        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Not an admin." });
        }
        const doesPasswordMatch = await bcrypt.compare(data.password, user.password);
        if (!doesPasswordMatch)
            return res.status(404).json({ message: "Invalid Credendials" });
        const admin_token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
            );
        res.cookie("admin_token", admin_token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 3600, 
        });
        res.status(200).json({ message: "Admin logged in successfully", admin_token });
      
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
export async function logoutAdmin(req, res) {
    try {
        res.cookie("admin_token", admin_token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: -1,
        });
        res.status(200).json({ message: "Admin logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function updateAdmin(req, res) { }