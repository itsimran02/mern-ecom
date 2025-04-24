import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

export const registerUser = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    const checkUserByEmail = await User.findOne({ email });
    const checkUserByUserName = await User.findOne({
      userName,
    });

    if (checkUserByEmail || checkUserByUserName) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      userName: userName?.trim(),
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = createToken(
      user,
      process.env.JWT_SECRET_KEY
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
      .status(201)
      .json({
        success: true,
        message: "user created successfuly",
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!verifyPassword) {
      return res
        .status(400)
        .json({ message: "Invalid credentials" });
    }

    // const token = jwt.sign(
    //   {
    //     userId: user._id,
    //     role: user.role,
    //   },
    //   "SECRET_KEY",
    //   {
    //     expiresIn: "15m",
    //   }
    // );

    const token = createToken(
      user,
      process.env.JWT_SECRET_KEY
    );
    // console.log(token);
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
      .status(200)
      .json({
        success: true,
        message: "logged in sucessfully",
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};

export const checkAuth = async (req, res) => {
  const { user } = req;
  console.log(user);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "unauthed user",
    });
  }

  res.status(200).json({
    success: true,
    message: "user authenticated",
    user,
  });
  try {
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "unauthed user",
    });
  }
};
