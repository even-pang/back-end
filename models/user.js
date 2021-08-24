const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: DataTypes.STRING(30),
                primaryKey: true,
            },
            pwd: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            user_nm: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            telno: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            gender: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            user_type: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            use_yn: {
                type: DataTypes.STRING(2),
                defaultValue : 'Y',
            },
            reg_ip: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            nick_nm: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            visit_dt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            user_gpin: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            use_agree_dt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            person_agree_dt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            email_agree_dt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            wanna_genre: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            underscored: false,
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
            tableName: 'tb_user',
            modelName: 'User'
        });
    }
    static associate(db) {
        db.User.hasOne(db.Customer, { foreignKey: 'user_id', sourceKey: 'user_id' });
        db.User.belongsToMany(db.Art, { through: 'Like', as: 'Liked' });
    };
}