import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import respondWith from "./respondWith";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "ilovecoding";

export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePassword = (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
}

export const generateJWTToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET);
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        respondWith("UNAUTHORIZED", 401)
    }
}