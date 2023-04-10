const { kata } = require('../repository/database');

module.exports = {
    data: async (req, res) => {
        try {
            const katas = await kata.findAll();
            res.status(200).json({
                status: 200,
                message: "data successfully sent",
                kata: katas
            });
        } catch (error) {
            console.error(error.message);
            console.log(error);
            res.status(500).json({
                status: 500,
                message: "Server error.",
            });
        }
    },
    index: async (req, res) => {
        try {
            const katas = await kata.findOne({
                where: {
                    id: req.params.id,
                },
            });
            console.log(kata.id);
            res.status(200).json({
                status: 200,
                message: "data successfully sent",
                kata: katas
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 500,
                message: "Server error.",
            });
        }
    },
    create: async (req, res) => {
        const { word, makna } = req.body
        try {
            const katas = await kata.create({
                word, makna
            })

            if (katas === 0) {
                res.status(400).json({
                    message: 'failed',
                    data: 'Quiz not created'
                })
            }
            res.status(201).json({
                message: 'succes',
                data: katas
            })
        } catch (error) {
            res.status(500).json({
                message: 'failed',
                data: error.message
            })
        }
    },
    update: async (req, res) => {
        const { id } = req.params
        const payload = req.body
        try {
            const katas = await kata.update( payload, { where: { id } })

            if (katas === 0) {
                res.status(400).json({
                    message: 'failed',
                    data: 'Quiz not updated'
                })
            }
            const updated = await kata.findOne({ where: { id } })
            res.status(201).json({
                message: 'succes',
                data: updated
            })
        } catch (error) {
            res.status(500).json({
                message: 'failed',
                data: error.message
            })
        }
    },
    delete: async (req, res) => {
        const { id } = req.params
        try {
            const katas = await kata.destroy({ where: { id } })

            if (katas === 0) {
                res.status(400).json({
                    message: 'failed',
                    data: 'Quiz not deleted'
                })
            }
            res.status(201).json({
                message: 'succes',
                data: katas
            })
        } catch (error) {
            res.status(500).json({
                message: 'failed',
                data: error.message
            })
        }
    },
}