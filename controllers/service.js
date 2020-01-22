const Service = require("../models/service");

const serviceList = async (req, res) => {
  const vaccines = await Service.find();
  res.send(vaccines);
};

const create = async (req, res) => {
  const { serviceName, serviceDescription } = req.body;
  const newService = new Service({
    serviceName,
    serviceDescription
  });
  const savedService = await newService.save();
  res
    .send(savedService)
    .then(() => console.log("New Service Added!"), res.redirect("/services"))
    .catch(error => res.status(400).json("Error" + error));
};

const deleteService = (req, res, next) => {
  Service.findByIdAndRemove(req.params.id, (error, data) => {
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
  serviceList,
  create,
  deleteService
};
