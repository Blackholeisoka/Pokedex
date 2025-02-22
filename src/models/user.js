module.exports = (sequelize, DataTypes) => {

  // Defined database 'user' structure
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The username is already taken.'
      }
    },
    password: {
      type: DataTypes.STRING
    }
  })
}
