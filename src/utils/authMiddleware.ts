import { AppContext } from "../..";
import { verifyToken } from "./utils";
import respondWith from "./respondWith";
import Users from "../db/models/Users";

export const authMiddleware = async ({ req }) => {
    const context: AppContext = {};

    const token = req.headers.authorization.split(" ")[1] || "";

    if (token) {
        const tokenData = verifyToken(token);
        if (tokenData.id) {
            const userData = await Users.findOne({ where: { id: tokenData.id } });

            if (userData) {
                context.user = userData;
            }
            else {
                respondWith('User Not Authorized', 401)
            }
        }
    }
    return context;
};
