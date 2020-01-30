const openingHours = require("../models/openingHours");

const index = async (req, res) => {
  const hours = await openingHours.find().sort({ order: "asc" });
  res.send(hours);
};

const show = async (req, res) => {
  try {
    const hours = await openingHours.findById(req.params.id);
    res.send(hours);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    await openingHours.deleteMany();
    const times = Object.values(req.body);
    const days = Object.keys(req.body);
    const docs = times.map((time, index) => {
      return {
        openingHours: time,
        order: index,
        dayOfTheWeek: days[index]
      };
    });
    await openingHours.insertMany(docs);
    res.end();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  index,
  show,
  update
};
