import {Sequelize, DataTypes} from 'sequelize';
import User from "./User";
import sequelize from '../database/connection';

const  Upload = sequelize.define("Upload", {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    uploadURL: {
       type: DataTypes.STRING(35),
    },
    ownerId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'User',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
});

//Upload.belongsTo(User, { foreignKey: 'ownerId', as: 'owner'});

export default Upload;