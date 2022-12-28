import { AuthenticationError } from "apollo-server";
import { db } from "./db";
import { getAuthIdFromJWT } from "./util/auth";

export default async ({ req }) => {
    const context = {};
    const jwt = req && req.headers.authorization;
    let authId

    if (jwt) {
        try {
            authId = await getAuthIdFromJWT(jwt);
        } catch (e) {
            let message;
            if (e.message.includes('jwt expired')) {
                message = 'jwt expired'
            } else {
                message = 'malformed jwt in authorization header'
            }
            throw new AuthenticationError(message)
        }

        const user = await db.collection('users').findOne({ authId })
        if (user) {
            context.user = user
        } else {
            throw new AuthenticationError('no such user')
        }
    }

    return context;
}