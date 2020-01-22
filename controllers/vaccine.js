const Vaccine = require("../models/vaccines");

const VaccineList = async (req, res) => {
  const vaccines = await Vaccine.find();
  res.send(vaccines);
};

const create = async (req, res) => {
  const { brand, description, manufacturer } = req.body;
  const newVaccine = new Vaccine({
    brand,
    description,
    manufacturer
  });
  const savedVaccine = await newVaccine.save();
  res
    .send(savedVaccine)
    .then(() => console.log("New Vaccine Added!"), res.redirect("/vaccines"))
    .catch(error => res.status(400).json("Error" + error));
};

const deleteVaccine = (req, res, next) => {
  Vaccine.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  });
};

module.exports = {
  VaccineList,
  create,
  deleteVaccine
};
