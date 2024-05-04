import express from "express";
import ShortUrlSchema from "../schemas/shortUrl.js";
const shortUrlRouter = express.Router();

shortUrlRouter.post("/", async (req, res) => {
  const { url } = req.body;
  try {
    const shortUrl = await ShortUrlSchema.create({ full: url });
    res.status(201).json(shortUrl);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
shortUrlRouter.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrlSchema.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});
shortUrlRouter.get("/:shortUrl/data", async (req, res) => {
  const shortUrl = await ShortUrlSchema.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  res.json(shortUrl);
});
export default shortUrlRouter;
