const model = require('../repository/database');

module.exports = {
    submitOne : async (req, res) => {
        const { id, answer } = req.body
        try {
            await model.quiz.findOne({
                where: { id },
                attributes: ['key'],
                limit: 1
            }).then((quizez) => {
                if (quizez.key === answer) {
                    res.status(200).json({
                        message: 'jawaban benar',
                        data: {
                            score : 1,
                            id,
                            answer
                        }
                    })
                } else {
                    res.status(400).json({
                        message: 'jawaban salah',
                        data: {
                            score : 0,
                            id,
                            answer
                        }
                    })
                }
            }) 
        } catch (error) {
            res.status(500).json({
                message: 'failed',
                data: error.message
            })
        }
    },
    submitMany : async (req, res) => {
        const { id, answer } = req.body
        const answerCheck = {
            id: [],
            answer: []
        };
        let score = 0;
        try {
            for (let i = 0; i < id.length; i++) {
                const quizez = await model.quiz.findOne({ 
                    where: { id: id[i] },
                    attributes: ['key'],
                    limit: 1 
                })
                if (quizez.key === answer[i]) {
                    score += 1;
                    answerCheck.id.push(id[i]);
                    answerCheck.answer.push(answer[i]);
                } else {
                    answerCheck.id.push(id[i]);
                    answerCheck.answer.push(answer[i]);
                }
            }
            res.status(200).json({
                message: 'succes',
                score: score,
                data: {
                    answerCheck
                }
            })
        } catch (error) {
            res.status(500).json({
                message: 'failed',
                data: error.message
            })
        }
    }
}