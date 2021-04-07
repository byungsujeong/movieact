import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: '//127.0.0.1:4000/',
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation:{
            toggleLikeMovie: (_, {id, isLiked}, {cache}) => {
                cache.writeData({
                    id: `Movie:${id}`,
                    data: {
                        isLiked: !isLiked
                }})
            }
        }
    }
});

export default client;