const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
// NO LONGER NEEDED AFTER CREATING DATASOURCE & RESOLVER OBJECT
// const { addMocksToSchema } = require('@graphql-tools/mock');
// const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require("./schema");
const resolvers = require("./resolvers")
const TrackAPI = require("./datasources/track-api");

// NO LONGER NEEDED AFTER CREATING DATASOURCE & RESOLVER OBJECT
// const mocks = {
//   Query: () => ({
//     tracksForHome: () => [...new Array(6)],
//   }),
//   Track: () => ({
//     id: () => 'track_01',
//     title: () => 'Astro Kitty, Space Explorer',
//     author: () => {
//       return {
//         name: 'Grumpy Cat',
//         photo:
//           'https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg',
//       };
//     },
//     thumbnail: () =>
//       'https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg',
//     length: () => 1210,
//     modulesCount: () => 6,
//   }),
// };

// In this server, the Schema, Resolver, and DataSource come together.
async function startApolloServer() {
  const server = new ApolloServer({
    // NO LONGER NEEDED AFTER CREATING AND USING DATASOURCE & RESOLVER OBJECT
    // schema: addMocksToSchema({
    //   schema: makeExecutableSchema({ typeDefs }),
    //   mocks,
    // }),
    typeDefs, // Schemas, ex: Query, Track, Author
    resolvers, // Object with resolver functions.
  });
  const { url } = await startStandaloneServer(server, {
    // This obj configures our server's options.
    context: async () => {
      const { cache } = server;
      return {
        dataSources: { // <--- 3rd arg in resolver functions
          // Instantiated RESTDataSource class with cache capability.
          trackAPI: new TrackAPI({ cache }),
        }
      }
    }
  });

  console.log(`
      🚀  Server is running
      📭  Query at ${url}
    `);
}

startApolloServer();
