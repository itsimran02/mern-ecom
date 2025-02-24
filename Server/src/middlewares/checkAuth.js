import jwt from "jsonwebtoken";

export const checkAuthMiddleware = async (
  req,
  res,
  next
) => {
  const token = req.cookies.token;
  console.log(req);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "unauthorised user",
    });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};
