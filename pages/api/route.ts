import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../src/app/lib/cloudinary";
import multer from "multer";
import nextConnect from "next-connect";
import { Readable } from "stream";

// Define a custom interface for the ExtendedRequest
interface ExtendedRequest extends NextApiRequest {
  file?: Express.Multer.File; // Make file optional as it may not always be present in NextApiRequest
}

// Multer configuration
const upload = multer({ dest: "/tmp" });

// Create a new nextConnect instance
const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Define a middleware function to handle file uploads
const multerMiddleware = upload.single("file");

// Use the multer middleware with nextConnect
apiRoute.use((req, res, next) => {
  multerMiddleware(req as any, res as any, (err: any) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      next();
    }
  });
});

// Define POST handler for file upload
apiRoute.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(200).json({ url: result.secure_url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
