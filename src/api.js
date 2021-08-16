import _ from "lodash";
import axios from "axios";

const apiKey = "a8f551fd12a4b1c7e0039f0463f640a5";

export default {
    searchMovies: _.memoize(async function (title) {
        const url = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${apiKey}`
        const response = await axios.get(url);
        return response.data;
    }),

    getMovie: _.memoize(async function (id) {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        const response = await axios.get(url);
        return response.data;
    }),

    getImageUrl(path) {
        return `https://image.tmdb.org/t/p/w500/${path}?api_key=${apiKey}`
    }
}
