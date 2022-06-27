const Sequelize = require('sequelize');
const reqDatabase = require('./db');

const Answers = reqDatabase.define("answers", {
    bodyAnswer: {
        type: Sequelize.STRING,
        allowNull:false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

Answers.sync({force: false});

module.exports = Answers;