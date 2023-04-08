const quizCOntroller = require("../controllers/quizController");
const router = require("express").Router();
const verifyJWT  = require("../middleware/jwt_auth");

router.get("/", quizCOntroller.data);
router.get("/:id", quizCOntroller.index);
router.post("/", quizCOntroller.create);
router.put("/:id", quizCOntroller.update);
router.delete("/:id", quizCOntroller.delete);

module.exports = router;