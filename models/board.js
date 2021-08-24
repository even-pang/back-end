const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Board extends Model {
    static init(sequelize) {
        return super.init({
            brd_no: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            brd_kind: {
                type: DataTypes.STRING(10),
            },
            cate_cd: {
                type: DataTypes.STRING(10),
            },
            notice_yn: {
                type: DataTypes.STRING(1),
            },
            use_yn: {
                type: DataTypes.STRING(1),
            },
            ttl: {
                type: DataTypes.STRING(500),
            },
            ctnt: {
                type: DataTypes.TEXT,
            },
            high_reg_no: {
                type: DataTypes.INTEGER,
            },
            depth: {
                type: DataTypes.INTEGER,
            },
            all_reg_no: {
                type: DataTypes.INTEGER,
            },
            top_reg_no: {
                type: DataTypes.INTEGER,
            },
            view_cnt: {
                type: DataTypes.INTEGER,
                defaultValue : 0,
            },
            reg_id: {
                type: DataTypes.STRING(30),
            },
            reg_nm: {
                type: DataTypes.STRING(80),
            },
            reg_pwd: {
                type: DataTypes.STRING(50),
            },
            sdt: {
                type: DataTypes.STRING(10),
            },
            edt: {
                type: DataTypes.STRING(10),
            },
            url: {
                type: DataTypes.STRING(250),
            },
            brd_mgrno: {
                type: DataTypes.INTEGER,
            },
            secret_yn: {
                type: DataTypes.STRING(1),
            },
            zip_cd: {
                type: DataTypes.STRING(7),
            },
            email: {
                type: DataTypes.STRING(200),
            },
            delflag_yn: {
                type: DataTypes.STRING(1),
            },
            win_height: {
                type: DataTypes.INTEGER,
            },
            win_width: {
                type: DataTypes.INTEGER,
            },
            etc_field1: {
                type: DataTypes.STRING(400),
            },
            etc_field2: {
                type: DataTypes.STRING(400),
            },
            etc_field3: {
                type: DataTypes.STRING(400),
            },
            etc_field4: {
                type: DataTypes.STRING(400),
            },
            url_target: {
                type: DataTypes.STRING(20),
            },
            site_gb: {
                type: DataTypes.STRING(100),
            },
            ord: {
                type: DataTypes.INTEGER,
            },
        }, {
            sequelize,
            underscored: false,
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            tableName: 'tb_board',
            modelName: 'Board'
        });
    }
    static associate (db) {
        db.Board.belongsTo(db.Boardmgr, { foreignKey: 'brd_mgrno', targetKey: 'brd_mgrno' });
        db.Board.hasMany(db.File, { foreignKey: 'rel_key', sourceKey: 'brd_no' });
        db.Board.hasMany(db.Image);
    }
};