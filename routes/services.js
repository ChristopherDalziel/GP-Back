const express = require("express");
const router = express.Router();
const { checkToken, checkAdmin } = require("../controllers/token_middleware");
const {
  index,
  create,
  update,
  destroy,
  show
} = require("../controllers/service");

router.use(express.json());

router.get("/", index);

router.post("/create", checkToken, checkAdmin, create);

router.put("/update/:id", checkToken, checkAdmin, update);

router.delete("/delete/:id", checkToken, checkAdmin, destroy);

router.get("/:id", checkToken, checkAdmin, show);

module.exports = router;
