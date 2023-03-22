import { Model, DataTypes } from 'sequelize';
import db from '../db';

class Users extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db.sequelize,
        tableName: 'users',
        underscored: true,
    }
);

export default Users;