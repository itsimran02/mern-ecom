// utils/authMiddleware.js
import jwt from "jsonwebtoken";

export const createToken = (user, secretKey, expiry) => {
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    secretKey,
    {
      expiresIn: expiry,
    }
  );
  return token;
};

export default createToken;
