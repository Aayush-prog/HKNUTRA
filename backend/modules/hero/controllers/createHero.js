const mongoose = require("mongoose");
const path = require("path");
const createHero = async (req, res) => {
  const HeroModel = mongoose.model("Hero");
  const { title, body } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newHero = await HeroModel.create({
      title,
      image,
      body,
    });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createHero;
