const bab = require("../repository/model/bab");
const subbab = require("../repository/model/subbab");


module.exports = {
  data: async function (req, res) {
    try {
      const bab = await bab.findAll();
      res.status(200).json({
        status: 200,
        message: "data successfully sent",
        bab: bab,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },
  index: async function (req, res) {
    try {
      const bab = await bab.findOne({
        where: {
          id: req.params.id,
        },
      });
      console.log(bab.id);
      const subbab = await subbab                                                                                                                                .findAll({
        where: {
          belongTo: bab.id,
        },
      });
      res.status(200).json({
        status: 200,
        message: "data successfully sent",
        bab: bab,
        subbab: subbab,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },
  createbab: async function (req, res) {
    try {
      var url =
        req.protocol +
        "://" +
        req.get("host") +
        "/images/" +
        req.body.imageName;
      console.log(req.body);
      const bab = await bab.create({
        judul: req.body.judul,
        
      });
      res.status(201).json({
        status: 201,
        message: "data succesfully created",
        bab: bab,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },
  createSubbab: async function (req, res) {
    try {
      const subbab = await subbab.create({
        judul: req.body.judul,
        isi: req.body.isi,
        belongTo: req.body.belongTo,
      });
      res.status(201).json({
        status: 201,
        message: "data succesfully created",
        subbab: subbab,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },
  updatebab: async function (req, res) {
    try {
      var url =
        req.protocol +
        "://" +
        req.get("host") +
        "/images/" +
        req.body.imageName;
      await bab.update(
        {
          judul: req.body.judul,
          imageName: url,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        status: 200,
        message: "data successfully updated",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },
  updateSubbab: async function (req, res) {
    try {
      subbab.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        status: 200,
        message: "data successfully updated",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },
  deletebab: async function (req, res) {
    try {
      await bab.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        status: 200,
        message: "data successfully deleted",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },
  deleteSubbab: async function (req, res) {
    try {
      await subbab.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        status: 200,
        message: "data successfully deleted",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },
};