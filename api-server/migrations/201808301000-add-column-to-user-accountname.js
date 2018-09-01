const db = require('../models')
const tableName = db.User.tableName

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .addColumn(tableName, 'accountName', {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING,
        after: 'email'
      })
      .then(() =>
        queryInterface.addIndex(tableName, {
          fields: ['accountName'],
          unique: true
        })
      )
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(tableName, 'users_account_name')
  }
}
