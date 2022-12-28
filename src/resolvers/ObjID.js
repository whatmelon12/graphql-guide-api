import { UserInputError } from "apollo-server";
import { GraphQLScalarType } from "graphql";
import { ObjectId } from 'mongodb';
import { InputError } from "../util/errors";

const OBJECT_ID_ERROR = 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
const parseValue = value => {
    let id;
    try {
        id = ObjectId(value)
    } catch (error) {
        if (error.message === OBJECT_ID_ERROR) {
            // throw new UserInputError('invalid id', { invalidArgs: { id: 'not a valid Mongo ObjectId' } })
            throw new InputError({ id: 'not a valid Mongo ObjectId' })
        } else {
            throw error
        }
    }
    return id
}

export default {
    ObjID: new GraphQLScalarType({
        name: 'ObjID',
        description: 'ObjectId',
        parseValue,
        parseLiteral: ast => parseValue(ast.value),
        serialize: objectId => objectId.toString()
    })
}