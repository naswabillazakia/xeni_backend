const quizCOntroller = require("../controllers/quizController");
const router = require("express").Router();
const { verifyToken } = require("../middleware/jwt_auth");

router.get("/", verifyToken, quizCOntroller.data);
router.get("/:id", verifyToken, quizCOntroller.index);
router.post("/", verifyToken, quizCOntroller.create);
router.put("/:id", verifyToken, quizCOntroller.update);
router.delete("/:id", verifyToken, quizCOntroller.delete);

module.exports = router;