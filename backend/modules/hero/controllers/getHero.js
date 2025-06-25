const mongoose = require("mongoose");
const getHero = async (req, res) => {
  const HeroModel = mongoose.model("Hero");
  try {
    const hero = await HeroModel.find();
    res.satus(201).json({
      status: "success",
      message: "Hero found successfully",
      data: hero,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getHero;
