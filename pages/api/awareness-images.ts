import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dir = path.join(process.cwd(), "public", "images", "awareness");
  try {
    const files = fs.readdirSync(dir).filter((file) =>
      /\.(jpe?g|png|gif|webp)$/i.test(file)
    );
    res.status(200).json({ images: files });
  } catch (e) {
    res.status(500).json({ images: [] });
  }
}