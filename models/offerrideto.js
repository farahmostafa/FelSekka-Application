const Sequelize = require("sequelize");
module.exports = sequelize.define("offerrideto", {  
    id: {
      type: Sequelize.INTEGER(255),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userid: {
        type: Sequelize.INTEGER(255),
        allowNull: false
      },
    carid:{
        type: Sequelize.INTEGER(255),
        allowNull: false
    },
    numberofseats:{
        type:Sequelize.INTEGER(255),
        allowNull: false
    },
    fromlatitude:{
        type:Sequelize.DECIMAL,
        allowNull: false
    },
    fromlongitude:{
        type:Sequelize.DECIMAL,
        allowNull: false,
    },
    toorgid:{
        type:Sequelize.INTEGER(255),
        allowNull: false,
    },
    date:{
        type:Sequelize.DATE,
        allowNull: false,
    },
    arrivaltime:{
        type:Sequelize.TIME,
        allowNull: false,
    },
    ridewith:{
        type:Sequelize.STRING(300),
        allowNull: false,
    },
    smoking:{
        type:Sequelize.STRING(300),
        allowNull: false,
    },
    earliesttime:{
        type:Sequelize.TIME,
        allowNull: false,
    },
    status:{
        type:Sequelize.STRING(300),
        allowNull: false,
        defaultValue: "pending"
    }
  }
  );