const openingHours = require("../models/openingHours");

const index = async (req, res) => {
  const hours = await openingHours.find();
  res.send(hours);
};

// const show = async (req, res) => {
//   try {
//     const vaccine = await Vaccine.findById(req.params.id);
//     res.send(vaccine);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

const create = async (req, res) => {
  const {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  } = req.body;
  const newOpeningHours = new Hours({
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  });
  const savedOpeningHours = await newOpeningHours.save();
  res
    .send(savedOpeningHours)
    .then(
      () => console.log("New Opening Hours Added!"),
      res.redirect("/contact")
    )
    .catch(error => res.status(400).json("Error" + error));
};

// const destroy = (req, res, next) => {
//   Vaccine.findByIdAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data
//       });
//     }
//   });
// };

// const update = async (req, res, next) => {
//   try {
//     const updatedVaccine = await Vaccine.findOneAndUpdate(
//       {
//         _id: req.params.id
//       },
//       req.body,
//       { new: true }
//     );
//     res.send(updatedVaccine);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

module.exports = {
  index,
  create
};
