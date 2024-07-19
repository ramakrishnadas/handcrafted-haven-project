import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../src/app/lib/cloudinary';
import multer from 'multer';
import nextConnect from 'next-connect';
import { IncomingMessage, ServerResponse } from 'http';

interface ExtendedRequest extends IncomingMessage {
  file: Express.Multer.File;
}

const upload = multer({ dest: '/tmp' });

const apiRoute = nextConnect({
  onError(error, req: ExtendedRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req: ExtendedRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
