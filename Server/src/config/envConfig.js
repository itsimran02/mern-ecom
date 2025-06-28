import dotenv from "dotenv";
dotenv.config();

export const STRIPE_KEY = process.env.STRIPE_KEY;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const API_KEY = process.env.API_KEY;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_SECRET = process.env.API_SECRET;
export const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
