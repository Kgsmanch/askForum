const Sequelize = require('sequelize');
const reqDatabase = require('./db');

const insertAsk = reqDatabase.define('forumAsks', {
    title: {
        type: Sequelize.STRING,
        allowNull:false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull:false
    }
});

insertAsk.sync({force:false}).then(() => {});

module.exports = insertAsk;
