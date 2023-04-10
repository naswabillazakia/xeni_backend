const quizController = require("../controllers/quizController");
const router = require("express").Router();
const verifyJWT  = require("../middleware/jwt_auth");

router.get("/", quizController.data);
router.get("/:id", quizController.index);
router.get("/category/:id", quizController.getbyCategory);
router.get("/level/:id", quizController.getbyLevel);
router.post("/", quizController.create);
router.put("/:id", quizController.update);
router.delete("/:id", quizController.delete);

module.exports = router;