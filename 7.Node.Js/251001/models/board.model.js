const {DataTypes, BaseError} = require("sequelize");
const sequelize = require("./index.js");
const User  = require("./user.model.js"); //추가

const Board = sequelize.define("Board",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    writer: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hit: {
        type: DataTypes.INTEGER(10),
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // default NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // default NOW
    }
},{
    tableName: "boards",
    timestamps: false
});

// 관계 설정 : boards.user_id => users.user_id
// Board.belongsTo(User,{
//     foreignKey: "user_id",
//     // 타겟이 되는 -> 1이 User에서 어떤 속성으로 관계를 맺을 것이냐?
//     targetKey: "user_id",
//     //ON DELETE CASCADE
//     // onDelete: "CASCADE"
//     onDelete: "SET NULL"
// })

module.exports = Board; 
