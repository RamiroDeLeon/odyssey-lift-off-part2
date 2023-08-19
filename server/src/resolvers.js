// RESOLVERS OBJECT. NOTE:
//   - FULL RESOLVER PARAMS: (parent, args, contextValue, info)
//   - Unused resolver params can be either '_' or omitted.
//   - Args can be destructured, ex: contextValue can be { dataSource }
const resolvers = {
    // Resolvers for Query type from schema.js go here.
    Query: {
        tracksForHome: (_, __, { dataSources }) => {
            return dataSources.trackAPI.getTracksForHome();
        }
    },
    // Resolvers for Track type from schema.js go here.
    Track: {
        // The value of 'parent' arg is the current Track which
        // has an authorID thatwe can destructure.
        author: ({ authorID }, _, { dataSources }) => {
            return dataSources.trackAPI.getAuthor(authorID);
        }
    }
}

module.exports = resolvers;