const kataCOntroller = require("../controllers/kataController");
const router = require("express").Router();
const verifyJWT  = require("../middleware/jwt_auth");

router.get("/", kataCOntroller.data);
router.get("/:id", kataCOntroller.index);
router.post("/", kataCOntroller.create);
router.put("/:id", kataCOntroller.update);
router.delete("/:id", kataCOntroller.delete);

module.exports = router;