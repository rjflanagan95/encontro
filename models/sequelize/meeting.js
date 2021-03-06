module.exports = function(sequelize, DataTypes) {
  var Meeting = sequelize.define("Meeting", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    agenda: {
      type: DataTypes.TEXT
    },
    attendees: {
      type: DataTypes.STRING
    },
    minutes: {
      type: DataTypes.TEXT
    },
    active:{
      type:DataTypes.INTEGER,
      default:0,
      allowNull:false
    }
  });

  Meeting.associate = function(models) {
    Meeting.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });

    Meeting.belongsTo(models.Organization, {
      foreignKey: {
        allowNull:true
      }
    });
  };

  return Meeting;
};
