import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import mime from "mime-types";
import { v4 as uuid } from "uuid";
import { env } from "../../env/server.mjs";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const extension = mime.extension(file.mimetype) || file.originalname;
      return cb(null, `${uuid()}.${extension}`);
    },
  }),
});

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch: (req, res) => {
    res.status(405).json({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      error: `Method '${req.method}' Not Allowed`,
    });
  },
});

handler.post(upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(500).json({ error: "Failed to upload file" });
  }
  const href = `${env.APP_URL}/uploads/${req.file.filename}`;
  res.status(200).json({ href });
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
