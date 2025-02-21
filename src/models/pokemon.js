// Modèle Sequelize
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: "Utiliser uniquement des nombres entiers pour les points de vie"},
          min: {
            arg: [0],
            msg: 'Les points de vie doivent être suppérieure ou égale à 0'
          },
          max: {
            arg: [999],
            msg: 'Les points de vie doivent être inférieure à 999'
          },
          notNull: {msg: "Les points de vie sont une propriété obligatoire"}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          return this.setDataValue('types', types.join())
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }