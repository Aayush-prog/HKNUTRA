const mongoose = require("mongoose");
const getHeroById = async (req, res) => {
  const HeroModel = mongoose.model("Hero");
  const { heroId } = req.params;
  try {
    const hero = await HeroModel.findById(heroId);
    if (!hero) {
      return res.status(404).json({
        status: "error",
        message: "Hero not found",
      });
    }
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
module.exports = getHeroById;
