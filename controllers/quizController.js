const { quiz } = require('../repository/database');

module.exports = {
    data: async (req, res) => {
        try {
            const quizez = await quiz.findAll();
            res.status(200).json({
                status: 200,
                message: "data successfully sent",
                quiz: quizez
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
            const quizez = await quiz.findOne({
                where: {
                    id: req.params.id,
                },
            });
            console.log(quiz.id);
            res.status(200).json({
                status: 200,
                message: "data successfully sent",
                quiz: quizez
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
        const { question, a, b, c, d, key, categoryId, levelId } = req.body
        try {
            const quizez = await quiz.create({
                question, a, b, c, d, key, categoryId, levelId
            })

            if (quizez === 0) {
                res.status(400).json({
                    message: 'failed',
                    data: 'Quiz not created'
                })
            }
            res.status(201).json({
                message: 'succes',
                data: quizez
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
            const quizez = await quiz.update( payload, { where: { id } })

            if (quizez === 0) {
                res.status(400).json({
                    message: 'failed',
                    data: 'Quiz not updated'
                })
            }
            const updated = await quiz.findOne({ where: { id } })
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
            const quizez = await quiz.destroy({ where: { id } })

            if (quizez === 0) {
                res.status(400).json({
                    message: 'failed',
                    data: 'Quiz not deleted'
                })
            }
            res.status(201).json({
                message: 'succes',
                data: quizez
            })
        } catch (error) {
            res.status(500).json({
                message: 'failed',
                data: error.message
            })
        }
    }
}