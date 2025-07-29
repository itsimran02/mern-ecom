import {
  APPLICATION_STATE,
  FRONTEND_URL,
} from "../config/envConfig.js";
import AppError from "../utils/appError.js";

const userLogOut = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    res.clearCookie("token", {
      httpOnly: true,
      secure: APPLICATION_STATE === "production",
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(
      new AppError(
        error.message || "something went wrong",
        500
      )
    );
  }
};

export { userLogOut };
