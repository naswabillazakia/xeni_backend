const quiz = require('../repository/model/quiz');

module.exports = {
    data: async (req, res) => {
        try {
            const quiz = await quiz.findAll();
            res.status(200).json({
                status: 200,
                message: "data successfully sent",
                quiz: quiz
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                status: 500,
                message: "Server error.",
            });
        }
    },
    index: async (req, res) => {
        try {
            const quiz = await bab.findOne({
                where: {
                    id: req.params.id,
                },
            });
            console.log(quiz.id);
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
    create: async (req, res) => {
        const { quiz, a, b, c, d, key, categoryId, LevelId } = req.body
        try {
            const quizez = await quiz.create({
                quiz, a, b, c, d, key, categoryId, LevelId
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
        const { quiz, a, b, c, d, key, categoryId, LevelId } = req.body
        try {
            const quizez = await quiz.update({
                quiz, a, b, c, d, key, categoryId, LevelId
            }, { where: { id } })

            if (quizez === 0) {
                res.status(400).json({
                    message: 'failed',
                    data: 'Quiz not updated'
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