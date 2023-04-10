const express = require("express");
const router = express.Router();
const kata = require("./kata");
const quiz = require("./quiz");
const auth = require("./auth");
const jobsheet = require("./jobsheet");

router.get("/", (req, res) => {
    res.status(200).json({
        message: "welcome to the XENI API"
    });
});
router.use("/jobsheet", jobsheet);
router.use("/quiz", quiz);
router.use("/kata", kata);
router.use("/auth", auth);

module.exports = router;