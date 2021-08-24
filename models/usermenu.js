const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Usermenu extends Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: DataTypes.STRING(30),
            },
            menu_no: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        }, {
            sequelize,
            underscored: false,
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            tableName: 'tb_usermenu',
            modelName: 'Usermenu'
        });
    }
    static associate(db) { };
}