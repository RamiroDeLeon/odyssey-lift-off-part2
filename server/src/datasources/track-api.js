const { RESTDataSource } = require("@apollo/datasource-rest")

/*
    RESTDataSource class has caching capabilities
    Ex of usage from server/src/index.js
    const { url } = await startStandaloneServer(server, {
        context: async () => {
        const { cache } = server;
        return {
            dataSources: {
                // Instantiated RESTDataSource class with cache capability.
                trackAPI: new TrackAPI({ cache }),
            }
        }
        }
    });
*/


class TrackAPI extends RESTDataSource {
    baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";

    getTracksForHome() {
        return this.get("tracks");
    }

    getAuthor(authorId) {
        return this.get(`author/${authorId}`);
    }
}



module.exports = TrackAPI