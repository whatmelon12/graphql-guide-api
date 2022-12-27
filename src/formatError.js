import { get } from 'lodash'

export default error => {
    console.log(error)
    console.log(get(error, 'extensions.exception.stacktrace'))

    const name = get(error, 'extensios.exception.name') || ''
    if (name.startsWith('Mongo')) {
        return new Error('Internal Server Error')
    } else {
        return error
    }
}