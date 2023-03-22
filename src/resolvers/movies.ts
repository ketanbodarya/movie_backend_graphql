import {
    Resolver,
    MovieResponse,
    QueryGetMovieArgs,
    MutationCreateMovieArgs,
    MutationUpdateMovieArgs,
    MutationDeleteMovieArgs,
    PaginatedList,
    QueryMoviesArgs,
    MovieFields
} from "../datatypes/types";
import respondWith from "../utils/respondWith";
import Movie from "../db/models/Movies";
import Users from "../db/models/Users";
import { AppContext } from "../..";

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
                Movie.update(
                    movie,
                    {
                        where: { id: id },
                    }
                ).then(() => {
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
                });
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

const deleteMovie: Resolver<MovieResponse> = async (_: any, { id }: MutationDeleteMovieArgs, context: AppContext) => {
    try {
        const movieData = Movie.findOne({
            where: {
                id: id
            }
        });

        if (movieData) {
            return Movie.destroy(
                {
                    where: { id: id },
                }
            );
        }
        else {
            respondWith('Movie not found', 404);

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
        pagination = { pageNumber: 1, pageSize: PAGE_SIZE },
        sort = { field: MovieFields.Name, isAsc: true },
    }: QueryMoviesArgs
) => {
    
};


export const MovieResolver = {
    query: { getMovie, movies },
    mutation: { createMovie, updateMovie, deleteMovie },
};

