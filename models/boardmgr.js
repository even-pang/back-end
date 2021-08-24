const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Boardmgr extends Model {
    static init(sequelize) {
        return super.init({
            brd_mgrno: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            brd_nm: {
                type: DataTypes.STRING(100),
            },
            brd_snm: {
                type: DataTypes.STRING(50),
            },
            brd_skin_cd: {
                type: DataTypes.STRING(10),
            },
            use_yn: {
                type: DataTypes.STRING(1),
            },
            list_cnt: {
                type: DataTypes.INTEGER,
            },
            delflag: {
                type: DataTypes.STRING(10),
            },
            write_auth_cd: {
                type: DataTypes.STRING(10),
            },
            attach_file_cnt: {
                type: DataTypes.INTEGER,
            },
            writer_use_yn: {
                type: DataTypes.STRING(1),
            },
            email_use_yn: {
                type: DataTypes.STRING(1),
            },
            term_use_yn: {
                type: DataTypes.STRING(1),
            },
            secret_use_yn: {
                type: DataTypes.STRING(1),
            },
            reply_use_yn: {
                type: DataTypes.STRING(1),
            },
            regdt_use_yn: {
                type: DataTypes.STRING(1),
            },
            cmt_use_yn: {
                type: DataTypes.STRING(1),
            },
            thm_width_size: {
                type: DataTypes.STRING(10),
            },
            thm_height_size: {
                type: DataTypes.STRING(10),
            },
            brd_desc: {
                type: DataTypes.STRING(1000),
            },
            reg_ip: {
                type: DataTypes.STRING(20),
            },
            brd_reg_cnt: {
                type: DataTypes.INTEGER,
            },
            date_use_yn: {
                type: DataTypes.STRING(1),
            },
            date_title: {
                type: DataTypes.STRING(100),
            },
            term_sdt_title: {
                type: DataTypes.STRING(100),
            },
            term_edt_title: {
                type: DataTypes.STRING(100),
            },
            etc_field1_use_yn: {
                type: DataTypes.STRING(1),
            },
            etc_field1_title: {
                type: DataTypes.STRING(100),
            },
            etc_field2_use_yn: {
                type: DataTypes.STRING(1),
            },
            etc_field2_title: {
                type: DataTypes.STRING(100),
            },
            etc_field3_use_yn: {
                type: DataTypes.STRING(1),
            },
            etc_field3_title: {
                type: DataTypes.STRING(100),
            },
            etc_field4_use_yn: {
                type: DataTypes.STRING(1),
            },
            etc_field4_title: {
                type: DataTypes.STRING(100),
            },
            url_use_yn: {
                type: DataTypes.STRING(1),
            },
            popsize_use_yn: {
                type: DataTypes.STRING(1),
            },
            direct_url_use_yn: {
                type: DataTypes.STRING(1),
            },
            cate_cd_use_yn: {
                type: DataTypes.STRING(1),
            },
            cate_cd: {
                type: DataTypes.STRING(10),
            },
            top_fix_use_yn: {
                type: DataTypes.STRING(1),
            },
            cate_cd_title: {
                type: DataTypes.STRING(50),
            },
            site_gb: {
                type: DataTypes.STRING(10),
            },
            site_share_yn: {
                type: DataTypes.STRING(1),
            },
            total_search_use_yn: {
                type: DataTypes.STRING(1),
            },
            ord_use_yn: {
                type: DataTypes.STRING(1),
            },
            ctnt_use_yn: {
                type: DataTypes.STRING(1),
            },
        }, {
            sequelize,
            underscored: false,
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            tableName: 'tb_boardmgr',
            modelName: 'Boardmgr'
        });
    }
    static associate (db) {
        db.Boardmgr.hasMany(db.Board, { foreignKey: 'brd_mgrno', sourceKey: 'brd_mgrno' });
    };
}