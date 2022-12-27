import { GraphQLScalarType } from "graphql";
import { ObjectId } from 'mongodb';

export default {
    ObjID: new GraphQLScalarType({
        name: 'ObjID',
        description: 'ObjectId',
        parseValue: value => ObjectId(value),
        parseLiteral: ast => ObjectId(ast.value),
        serialize: objectId => objectId.toString()
    })
}