import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dclmvv2sg",
  api_key: "235463784664121",
  api_secret: "abga4rnE2OWUwGFuED0JSpo4OOU",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const upload = multer({ storage });
