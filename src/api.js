var axios = require("axios").default;

export default {
    async search() {
        var options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { i: 'tt4154796', r: 'json' },
            headers: {
                'x-rapidapi-key': 'b97225f9c7msh53e09e4cbfacb91p1200a2jsn4ce380a01934',
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        return response.data;
    }
}
