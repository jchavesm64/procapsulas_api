import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({
    debug: false,
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: async ({ req }) => {
        const token = req.headers['authorization'];
        if (token !== null) {
            try {
                const usuarioActual = await jwt.verify(token, process.env.SECRETO);
                req.usuarioActual = usuarioActual;
                return {
                    usuarioActual
                };
            } catch (error) { }
        }
    },
})

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
server.applyMiddleware({ app });

mongoose.connect('mongodb+srv://main_user_db:1D2J3Y4V@Jklm8247@procapsulas.otfvv.mongodb.net/main?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(
    () => {
        console.log('Conectado a Mongo!!!')
        app.listen(
            { port: process.env.PORT || 4000 },
            () => console.log(`Server is Runnig.. http://localhost:4000${server.graphqlPath}`)
        )
    }
)
