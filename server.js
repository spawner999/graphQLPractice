const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();

//middleware
app.use('/graphql', expressGraphQL({
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening')
});
