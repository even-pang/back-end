const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Menu extends Model {
    static init(sequelize) {
        return super.init({
            menu_no: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            menu_nm: {
                type: DataTypes.STRING(50),
            },
            menu_gb: {
                type: DataTypes.STRING(10),
            },
            menu_url: {
                type: DataTypes.STRING(250),
            },
            use_yn: {
                type: DataTypes.STRING(1),
            },
            ord: {
                type: DataTypes.INTEGER,
            },
            menu_lvl: {
                type: DataTypes.INTEGER,
            },
            top_menu_no: {
                type: DataTypes.INTEGER,
            },
            full_menu_no: {
                type: DataTypes.STRING(1000),
            },
            up_menu_no: {
                type: DataTypes.INTEGER,
            },
            menu_fmt_cd: {
                type: DataTypes.STRING(10),
            },
            url_target: {
                type: DataTypes.STRING(20),
            },
            brd_mgrno: {
                type: DataTypes.INTEGER,
            },
            menu_desc: {
                type: DataTypes.STRING(4000),
            },
        }, {
            sequelize,
            underscored: false,
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            tableName: 'tb_menu',
            modelName: 'Menu'
        });
    }
    static associate(db) { };
}