const validTypes = ['Grass', 'Poison', 'Fire', 'Water', 'Bug', 'Flying', 'Normal', 'Electric', 'Fairy'];

module.exports = (sequelize, DataTypes) => {

  // Defined database 'pokemon' structure
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The name is already taken.'
      },
      validate: {
        len: {
          args: [1, 25],
          msg: 'The name must be between 1 and 25 characters long.'
        },
        notEmpty: { msg: 'The name cannot be empty.' },
        notNull: { msg: 'The name is a required property.'}
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Only integer values are allowed for hit points.' },
        min: {
          args: [0],
          msg: 'Hit points must be greater than or equal to 0.'
        },
        max: {
          args: [999],
          msg: 'Hit points must be less than or equal to 999.'
        },
        notNull: { msg: 'Hit points are a required property.'}
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Only integer values are allowed for damage points.' },
        min: {
          args: [0],
          msg: 'Damage points must be greater than or equal to 0.'
        },
        max: {
          args: [99],
          msg: 'Damage points must be less than or equal to 99.'
        },
        notNull: { msg: 'Damage points are a required property.'}
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Only a valid URL is allowed for the image.' },
        notNull: { msg: 'The image is a required property.'}
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value) {
          if(!value) {
            throw new Error('A Pokémon must have at least one type.')
          }
          if(value.split(',').length > 3) {
            throw new Error('A Pokémon cannot have more than three types.')
          }
          value.split(',').forEach(type => {
            if(!validTypes.includes(type)) {
              throw new Error(`A Pokémon type must belong to the following list: ${validTypes}`)
            }
          });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
