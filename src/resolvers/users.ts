import {
    MutationSignupArgs,
    User,
    Resolver,
    LoginResponse,
    QueryLoginArgs,
    MutationChangePasswordArgs
} from "../datatypes/types";
import { checkEmailValidation, checkPasswordValidation } from "../utils/validator";
import Users from "../db/models/Users";
import respondWith from "../utils/respondWith";
import { hashPassword, comparePassword, generateJWTToken } from "../utils/utils";

const signup: Resolver<User> = async (_: any, { user }: MutationSignupArgs) => {

    try {
        if (user.email && user.password && user.username) {
            checkEmailValidation(user.email);
            checkPasswordValidation(user.password);

            const userData = await Users.findOne({ where: { email: user.email } });

            if (userData) {
                respondWith('User with this email already exist', 400)
            }
            else {
                const hashedPassword = await hashPassword(user.password);

                const createUser = await Users.create({
                    username: user.username,
                    email: user.email,
                    password: hashedPassword,
                });

                return {
                    email: createUser.email,
                    username: createUser.username,
                };
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

const login: Resolver<LoginResponse> = async (_: any, { data }: QueryLoginArgs) => {
    try {
        if (data.email && data.password) {
            checkEmailValidation(data.email);
            checkPasswordValidation(data.password);

            const userData = await Users.findOne({ where: { email: data.email } });


            if (userData) {
                const validPassword = await comparePassword(data.password, userData.password);
                if (validPassword) {
                    const newToken = generateJWTToken(userData);
                    return {
                        id: userData.id,
                        email: userData.email,
                        username: userData.username,
                        token: newToken,
                    };
                }
                else {
                    respondWith('Invalid credentials', 400)
                }
            }
            else {
                respondWith('User does not exist', 404)
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

const changePassword: Resolver<User> = async (_: any, { data }: MutationChangePasswordArgs) => {
    try {
        if (data.email && data.currentpassword && data.newPassword) {
            checkEmailValidation(data.email);
            checkPasswordValidation(data.currentpassword);
            checkPasswordValidation(data.newPassword);

            const userData = await Users.findOne({ where: { email: data.email } });

            if (userData) {
                const validPassword = await comparePassword(data.currentpassword, userData.password);
                if (validPassword) {
                    const hashedNewPassoword = await hashPassword(data.newPassword);

                    await Users.update(
                        {
                            password: hashedNewPassoword
                        },
                        {
                            where: { id: userData.id, email: userData.email }
                        }
                    );

                    return {
                        email: userData.email,
                        username: userData.username,
                    };
                }
                else {
                    respondWith('Current password does not match', 400)
                }
            }
            else {
                respondWith('User does not exist', 404)
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

export const UsersResolver = {
    query: { login },
    mutation: { signup, changePassword },
};
