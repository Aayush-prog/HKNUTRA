const mongoose = require("mongoose");
const delHero = async (req, res) => {
  const HeroModel = mongoose.model("Hero");
  const {} = req.body;
  const { heroId } = req.params;
  try {
    const hero = await HeroModel.findById(heroId);
    if (!hero) {
      return res.status(404).json({
        status: "error",
        message: "Hero not found",
      });
    }
    const delHero = await HeroModel.findByIdAndDelete(heroId);
    res.status(200).json({
      status: "success",
      message: "Hero deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delHero;
