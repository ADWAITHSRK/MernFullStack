import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import path from "path";
import { promisify } from "util";

dotenv.config();

cloudinary.config({
  cloud_name: "dwkczyfi5",
  api_key: "256397954859414",
  api_secret: "JiMtww8E0JpfBGCmIXzZ6nne_pI",
});

// Create a promisified version of the upload_stream function
const uploadToCloudinaryPromise = (fileBuffer, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    uploadStream.end(fileBuffer);
  });
};

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const uploadToCloudinary = async (req, res, next) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return next(new Error("No files provided"));
    }

    const cloudinaryUrls = [];
    const cloudinaryNames = [];

    // Process all files in parallel using Promise.all
    const uploadPromises = files.map(async (file) => {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      
      let uploadOptions = {
        folder: "ecommerce-app",
      };
      
      let fileBuffer = file.buffer;
      
      if (fileExtension === ".pdf") {
        uploadOptions.resource_type = "raw"; // For PDF uploads
      } else {
        uploadOptions.resource_type = "auto"; // For images
        // Only resize if it's an image
        try {
          fileBuffer = await sharp(file.buffer).resize({ width: 800, height: 800 }).toBuffer();
        } catch (err) {
          console.warn("Image resizing failed, using original buffer:", err);
          // If resizing fails, use the original buffer
          fileBuffer = file.buffer;
        }
      }
      
      try {
        const result = await uploadToCloudinaryPromise(fileBuffer, uploadOptions);
        return {
          url: result.secure_url,
          name: result.original_filename || file.originalname
        };
      } catch (err) {
        console.error("Error uploading to Cloudinary:", err);
        throw err;
      }
    });

    // Wait for all uploads to complete
    const results = await Promise.all(uploadPromises);
    
    // Extract URLs and names from results
    results.forEach(result => {
      cloudinaryUrls.push(result.url);
      cloudinaryNames.push(result.name);
    });
    
    // Attach the results to the request object
    req.body.cloudinaryUrls = cloudinaryUrls;
    req.body.cloudinaryName = cloudinaryNames; // Keep this as cloudinaryName to match updateProfile

    next();
  } catch (error) {
    console.error("Error in uploadToCloudinary middleware:", error);
    return res.status(500).json({ message: error.message });
  }
};