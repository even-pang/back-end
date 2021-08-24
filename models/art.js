const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Art extends Model {
    static init(sequelize) {
        return super.init({
            art_no: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            genre: {
                type: DataTypes.STRING(30),
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
            view_yn: {
                type: DataTypes.STRING(1),
            },
            depth: {
                type: DataTypes.INTEGER,
            },
            view_cnt: {
                type: DataTypes.INTEGER,
            },
            reg_id: {
                type: DataTypes.STRING(30),
            },
            reg_nm: {
                type: DataTypes.STRING(80),
            },
            ord: {
                type: DataTypes.INTEGER,
            },
        }, {
            sequelize,
            underscored: false,
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
            modelName: 'Art',
            tableName: 'tb_art'
        });
    }
    static associate(db) {
        db.Art.belongsTo(db.Customer, { foreignKey: 'reg_id', targetKey: 'user_id' });
        db.Art.hasMany(db.File, { foreignKey: 'rel_key', sourceKey: 'art_no' });
        db.Art.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
        db.Art.hasMany(db.Image);
        db.Art.hasMany(db.Comment);
    }
};
