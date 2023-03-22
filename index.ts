import * as dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from '@apollo/server';
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Resolvers, UserResponse } from "./src/datatypes/types";
import db from "./src/db/db";
import path, { dirname } from "path";
import { queryResolver, mutationResolver } from "./src/resolvers";
import { authMiddleware } from './src/utils/authMiddleware';


const PORT = Number(process.env.PORT) || 4000;

const loadSchema = loadFilesSync("./src/typedefs", {
    extensions: [".graphql"],
    recursive: true,
});
const mergedSchema = mergeTypeDefs(loadSchema);

const resolvers: Resolvers = {
    Query: queryResolver,
    Mutation: mutationResolver,
};


const schema = makeExecutableSchema({
    typeDefs: mergedSchema,
    resolvers,
});

export interface AppContext {
    user?: UserResponse;
}

const server = new ApolloServer<AppContext>({
    schema: schema,
});

async function testConnection() {
    try {
        await db.sequelize.authenticate();

        console.log('Database connection established successfully');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}
testConnection();

const { url } = await startStandaloneServer(server, {

    context: authMiddleware,

    listen: { port: PORT },

});

console.log(`🚀  Server ready at ${url}`);