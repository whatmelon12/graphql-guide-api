import { getAuthIdFromJWT } from "./util/auth";

const API_KEYS = ['alohomora'];

export default async ({ req }) => {
    const context = {};

    if (API_KEYS.includes(req.headers.authorization)) {
        context.apiUser = true
    } else {
        const jwt = req.headers.authorization;
        const authId = await getAuthIdFromJWT(jwt);
        // console.log(authId);
        if (authId === 'github|26941056') {
            context.user = {
                firstName: 'Omar',
                lastName: 'Mejia'
            }
        }
    }

    return context;
}