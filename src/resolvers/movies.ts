import {
    Resolver,
    MovieResponse,
    QueryGetMovieArgs,
    MutationCreateMovieArgs,
    MutationUpdateMovieArgs,
    MutationDeleteMovieArgs,
    PaginatedList,
    QueryMoviesArgs,
    MovieFields,
    DeleteMovieResponse
} from "../datatypes/types";
import respondWith from "../utils/respondWith";
import Movie from "../db/models/Movies";
import Users from "../db/models/Users";
import { AppContext } from "../..";
import { Op } from "sequelize";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

const getMovie: Resolver<MovieResponse> = (_: any, args: QueryGetMovieArgs) => {
    try {
        if (args.id) {
            const movieData = Movie.findOne({
                where: {
                    id: args.id
                },
                include: [{
                    model: Users,
                    attributes: ['id', 'username', 'email']
                }]
            })

            return movieData;
        }
        else {
            respondWith('Bad Request', 400);
        }
    }
    catch (e) {
        console.log(e);
        respondWith('Internal Server Error', 500);
    }
};

const createMovie: Resolver<MovieResponse> = (_: any, { movie }: MutationCreateMovieArgs, context: AppContext) => {
    try {
        if (movie.name, movie.description, movie.directorName, movie.releaseDate) {
            const movieData = Movie.create({
                movieName: movie.name,
                description: movie.description,
                directorName: movie.directorName,
                releaseDate: movie.releaseDate,
                userId: context.user.id,
            })

            return movieData;
        }
        else {
            respondWith('Bad Request', 400);
        }
    }
    catch (e) {
        console.log(e);
        respondWith('Internal Server Error', 500);
    }
};

const updateMovie: Resolver<MovieResponse> = async (_: any, { id, movie }: MutationUpdateMovieArgs, context: AppContext) => {
    try {
        if (movie) {
            const movieData = Movie.findOne({
                where: {
                    id: id
                }
            });

            if (movieData) {
                await Movie.update(
                    movie,
                    {
                        where: { id: id },
                    }
                );

                const updatedMovie = Movie.findOne({
                    where: {
                        id: id
                    },
                    include: [{
                        model: Users,
                        attributes: ['id', 'username', 'email']
                    }]
                });

                return updatedMovie;
            }
            else {
                respondWith('Movie not found', 404);

            }

        }
        else {
            respondWith('Bad Request', 400);
        }
    }
    catch (e) {
        console.log(e);
        respondWith('Internal Server Error', 500);
    }
};

const deleteMovie: Resolver<DeleteMovieResponse> = async (_: any, { id }: MutationDeleteMovieArgs, context: AppContext) => {
    try {
        const movieData = await Movie.findOne({
            where: {
                id: id
            }
        });

        if (movieData) {
            await Movie.destroy(
                {
                    where: { id: id },
                }
            );
            return { message: `Movie Deleted with the id = ${id}` };
        }
        else {
            return { message: `Movie with the id = ${id} not found.` };
        }
    }
    catch (e) {
        console.log(e);
        respondWith('Internal Server Error', 500);
    }
};

const movies: Resolver<PaginatedList> = async (_: any,
    {
        filter,
        pagination = { page: 1, perPage: PAGE_SIZE },
        sort = { sortColumn: MovieFields.Name, sortOrder: 'ASC' },
    }: QueryMoviesArgs
) => {
    const { page = 1, perPage = PAGE_SIZE } = pagination;
    const { search } = filter;
    const { sortColumn = MovieFields.Name, sortOrder = 'ASC' } = sort;

    const offset = (page - 1) * perPage;

    try {
        let moviesList = await Movie.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    {
                        directorName: {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                ]
            },
            order: [[sortColumn, sortOrder]],
            include: [{
                model: Users,
                attributes: ['id', 'username', 'email']
            }],
            offset,
            limit: perPage
        });

        const movies = moviesList.rows;
        const count = moviesList.count;

        return {
            movies: movies,
            meta: {
                pageSize: perPage,
                totalPages: Math.ceil(count / perPage),
            },
        };
    }
    catch (e) {
        console.log(e);
        respondWith('Internal Server Error', 500);
    }
};


export const MovieResolver = {
    query: { getMovie, movies },
    mutation: { createMovie, updateMovie, deleteMovie },
};

