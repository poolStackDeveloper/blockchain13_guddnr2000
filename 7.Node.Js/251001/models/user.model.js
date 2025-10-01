//시퀄라이즈에서 제공하는 데이터 타입들 (INTERGER, STRING)
const {DataTypes} = require("sequelize");
const sequelize = require("./index.js");
const Board = require("./board.model.js");

// 유저 모델을 정의할텐데
// sequelize.define(모델이름, 컬럼정의, 옵션);

// sequelize.define("User", {},{})
// "User" => users
// 근데? 테이블 이름을 users로 명시해주고 싶다? => 3번 째 인수에 설정해주면 됨
const User = sequelize.define("User", {
    id: {
        //INT
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        //VARCHAR
        type: DataTypes.STRING(50),
        unique: true
    },
    user_pw: {
        //VARCHAR
        type: DataTypes.STRING(50),
        allowNull: false //NULL 허용하지 않음
    },
    user_name: {
        type: DataTypes.STRING(50),
        allowNull: false //NULL 허용하지 않음
    },
    gender: {
        type: DataTypes.CHAR(4),
        defaultValue: "남자"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // default NOW
    }
},{
    // 실제 DB에서 사용할 테이블명을 명시 (대소문자 문제 회피)
    tableName: "users",
    // Sequelize가 자동으로 `createAt`을 생성하지 않도록 설정
    timestamps: false
})

// 1:N => 유저는 여러 개의 글을 작성할 수 있다.
User.hasMany(Board, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    onDelete: "SET NULL"
})

module.exports = User;