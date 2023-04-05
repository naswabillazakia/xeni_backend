const express = require("express");
const router = express.Router();
const materi = require("./materi");
const quiz = require("./quiz");
const auth = require("./auth");

router.get("/", (req, res) => {
    res.status(200).json({
        message: "welcome to the KOSA API"
    });
});
router.use("/materi", materi);
router.use("/quiz", quiz);
router.use("/auth", auth);

module.exports = router;