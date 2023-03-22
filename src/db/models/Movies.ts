import { Model, DataTypes } from 'sequelize';
import db from '../db';
import User from './Users';

class Movie extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public directorName!: string;
    public releaseDate!: Date;
    public userId!: number;
}

Movie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        directorName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        releaseDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize: db.sequelize,
        tableName: 'movies',
        underscored: true,
    }
);

export default Movie;