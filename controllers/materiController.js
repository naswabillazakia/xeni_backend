const { bab, subbab } = require("../repository/database");

module.exports = {
  getMateri: async (req, res) => {
    bab
      .findAll({
        include: [
          {
            model: subbab,
            as: "subbab",
          },
        ],
        exclude: ["createdAt", "updatedAt"],
      })
      .then((bab) => {
        res.status(200).json({
          status: 200,
          message: "data successfully sent",
          bab: bab,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          status: 500,
          message: "Server error.",
        });
      });
  },
  getMateriById: async (req, res) => {
    bab
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: subbab,
            as: "subbab",
          },
        ],
      })
      .then((bab) => {
        res.status(200).json({
          status: 200,
          message: "data successfully sent",
          bab: bab,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          status: 500,
          message: "Server error.",
        });
      });
  },
  createMateri: async (req, res) => {
    const { judul, subjudul, deskripsi, kesimpulan, subbabId } = req.body;
    bab
      .create({
        judul,
        subjudul,
        deskripsi,
        kesimpulan,
        subbabId: subbabId,
      })
      .then((bab) => {
        res.status(201).json({
          status: 201,
          message: "data successfully created",
          bab: bab,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          status: 500,
          message: "Server error.",
        });
      });
  },
  createSubab: async (req, res) => {
    const { judul, isi } = req.body;
    subbab
      .create({
        judul,
        isi,
      })
      .then((subbab) => {
        res.status(201).json({
          status: 201,
          message: "data successfully created",
          subbab: subbab,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          status: 500,
          message: "Server error.",
        });
      });
  },
  updateMateri: async (req, res) => {
    const { judul, subjudul, deskripsi, kesimpulan, subbabId } = req.body;
    await bab.findByPk(req.params.id)
    .then((bab) => {
      bab.judul = judul;
      bab.subjudul = subjudul;
      bab.deskripsi = deskripsi;
      bab.kesimpulan = kesimpulan;
      bab.subbabId = subbabId;
      return bab.save();
    })
    .then((bab) => {
      res.status(200).json({
        status: 200,
        message: "data successfully updated",
        data: bab || {},
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    });
},
  updateSubab: async (req, res) => {
    const { judul, isi } = req.body;
    await subbab.findByPk(req.params.id)
    .then((subbab) => {
      subbab.judul = judul;
      subbab.isi = isi;
      return subbab.save();
    })
    .then((subbab) => {
      res.status(200).json({
        status: 200,
        message: "data successfully updated",
        data: subbab || {},
      });
    })
  },
    deleteMateri: async (req, res) => {
      //delete bab and subbab
      const { id } = req.params;
      const babFind = await bab.findByPk(id);
      if (babFind) {
        await bab.destroy({
          where: {
            id: id,
          },
        });
        await subbab.destroy({
          where: {
            id: babFind.subbabId,
          },
        });
        res.status(200).json({
          status: 200,
          message: "data successfully deleted",
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "data not found",
        });
      }
  },
};

