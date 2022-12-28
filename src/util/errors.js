import { ApolloError } from "apollo-server";

export class InternalServerError extends ApolloError {
    constructor() {
        super(
            `We're sorry an error ocurred. We've been notified and will look into it`,
            'INTERNAL_SERVER_ERROR'
        )

        Object.defineProperty(this, 'name', { value: 'InternalServerError' })
    }
}

export class InputError extends ApolloError {
    constructor(errors) {
        let messages = []

        for (const arg in errors) {
            if (typeof errors[arg] === 'string') {
                const errorReason = errors[arg]
                messages.push(`Argument ${arg} is invalid: ${errorReason}.`)
            } else {
                const errorObject = errors[arg]
                for (const prop in errorObject) {
                    const errorReason = errorObject[prop]
                    messages.push(`Argument ${arg}.${prop} is invalid: ${errorReason}.`)
                }
            }
        }

        const fullMessage = messages.join(' ')
        super(fullMessage, 'INVALID_INPUT', { invalidArgs: errors })
    }
}