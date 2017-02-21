const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({ //use a closure to avoid undefined variables
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                const companyId = parentValue.id;
                //json server is doing the magic down here!!
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                    .then(resp => resp.data);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                const companyId = parentValue.companyId;
                return axios.get(`http://localhost:3000/companies/${companyId}`)
                    .then(resp => resp.data);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args) {
                const userId = args.id;
                return axios.get(`http://localhost:3000/users/${userId}`)
                    .then(resp => resp.data); //axios wrapping the response
            }
        },
        company: {
            type: CompanyType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args) {
                const companyId = args.id;
                return axios.get(`http://localhost:3000/companies/${companyId}`)
                    .then(resp => resp.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: {type: GraphQLString},
                age: {type: GraphQLInt},
                companyId: {type: GraphQLString}
            },
            resolve() {

            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery});
