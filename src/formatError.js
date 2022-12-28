import { ApolloError } from 'apollo-server'
import { get } from 'lodash'
import { InternalServerError } from './util/errors'

export default error => {
    console.log(error)
    console.log(get(error, 'extensions.exception.stacktrace'))

    const name = get(error, 'extensios.exception.name') || ''
    if (name.startsWith('Mongo')) {
        // return new Error('Internal Server Error')
        return new InternalServerError()
    } else {
        return error
    }
}