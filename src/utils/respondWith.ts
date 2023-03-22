import { GraphQLError } from "graphql";

const statusCodes = {
  200: "OK",
  201: "CREATED",
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  408: "TIMEOUT",
  500: "INTERNAL_SERVER_ERROR"
}

const respondWith = (message: string, code: keyof typeof statusCodes) => {
  throw new GraphQLError(message, {
    extensions: {
      code: statusCodes[code],
      http: { status: code },
    },
  });
}

export default respondWith;