const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Code extends Model {
    static init(sequelize) {
        return super.init({
            cd_type: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            comm_cd: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            cd_nm: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            cd_nm2: {
                type: DataTypes.STRING(50),
            },
            ord: {
                type: DataTypes.INTEGER,
            },
            cd_desc: {
                type: DataTypes.STRING(1000),
            },
        }, {
            sequelize,
            underscored: false,
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            tableName: 'tb_code',
            modelName: 'Code'
        });
    }
    static associate(db) { };
}