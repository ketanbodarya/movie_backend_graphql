import { MutationResolvers, QueryResolvers } from "../datatypes/types";
import { UsersResolver } from "./users"
import { MovieResolver } from "./movies"

export const queryResolver: QueryResolvers = {
    ...UsersResolver.query,
    ...MovieResolver.query,
}

export const mutationResolver: MutationResolvers = {
    ...UsersResolver.mutation,
    ...MovieResolver.mutation,
}