const quizCOntroller = require("../controllers/quizController");
const router = require("express").Router();
const verifyJWT  = require("../middleware/jwt_auth");

router.get("/", verifyJWT, quizCOntroller.data);
router.get("/:id", verifyJWT, quizCOntroller.index);
router.post("/", verifyJWT, quizCOntroller.create);
router.put("/:id", verifyJWT, quizCOntroller.update);
router.delete("/:id", verifyJWT, quizCOntroller.delete);

module.exports = router;