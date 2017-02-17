const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;
const _ = require('lodash');

const users = [
    {id: '23', firstName: 'Johnny', age: 69},
    {id: '26', firstName: 'RaWalle', age: 19},
    {id: '98', firstName: 'Danjo', age: 54}
];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args) {
                return _.find(users, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({query: RootQuery});
