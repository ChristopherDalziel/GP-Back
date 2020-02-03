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

router.post("/create", create);

router.put("/update/:id", update);

router.delete("/delete/:id", destroy);

router.get("/:id", show);

module.exports = router;
