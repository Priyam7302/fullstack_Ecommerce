import { OAuth2Client } from "google-auth-library";
import Auth from "../models/Auth.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture, sub } = ticket.getPayload();

    let user = await Auth.findOne({ email });

    if (user && user.isBlocked) {
      return res
        .status(403)
        .json({ message: "Your account has been blocked by admin" });
    }


    if (!user) {
      user = await Auth.create({
        name,
        email,
        googleId: sub,
        image: picture,
        role: "user",
        authProvider: "google",
      });
    }

    const authToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("auth_token", authToken, {
      httpOnly: true,
      secure: process.env.SECURE === "true",
      sameSite: process.env.SAMESITE || "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      message: "Login success",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
