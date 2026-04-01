import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

const getGoogleOAuthConfig = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  return { clientId, clientSecret };
};

export const signup = async (req, res) => {
  // res.send("signup route");

  const { fullName, email, password } = req.body;
  try {
    // hash passwords

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All Fields are Required",
      });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 charachters " });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser.id, res);

      res.status(201).json({
        _id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  // res.send("login route");
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user.id, res);
    res.status(200).json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in controller", error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const logout = (req, res) => {
  // res.send("logout route");
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in Logout Controller");
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile Picture Requred " });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profilePic: uploadResponse.secure_url },
    });

    const { password: _password, ...safeUser } = updatedUser;
    res.status(200).json({
      ...safeUser,
      _id: safeUser.id,
    });
  } catch (error) {
    console.log("Error in Update Profile in controller");
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller");
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    const googleConfig = getGoogleOAuthConfig();

    if (!googleConfig) {
      return res
        .status(500)
        .json({ message: "Google OAuth is not configured" });
    }

    const googleClient = new OAuth2Client(
      googleConfig.clientId,
      googleConfig.clientSecret,
    );

    if (!credential) {
      return res.status(400).json({ message: "Google credential is required" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: googleConfig.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload.email_verified) {
      return res
        .status(400)
        .json({ message: "Google account email is not verified" });
    }

    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      const randomPassword = crypto.randomBytes(32).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await prisma.user.create({
        data: {
          email: payload.email,
          fullName: payload.name || payload.email.split("@")[0],
          password: hashedPassword,
          profilePic: payload.picture || "",
        },
      });
    }

    generateToken(user.id, res);

    res.status(200).json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in google auth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
