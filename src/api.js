import _ from "lodash";
import axios from "axios";
import firebase from "@/firebase.js";
import store from "@/store";

firebase.auth.onAuthStateChanged(async (user) => {
    store.commit("setUser", user);
});

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
    },

    async getMoviesListId(userId) {
        const querySnapshot = await firebase.firestore
            .collection("lists")
            .where("userId", "==", userId)
            .limit(1)
            .get();

        if (querySnapshot.docs.length >= 1) {
            return querySnapshot.docs[0].id;

        } else {
            const doc = await this.createMoviesList(userId);
            return doc.id;
        }
    },

    async getMoviesList(listId) {
        const doc = await firebase.firestore
            .collection("lists")
            .doc(listId)
            .get();

        if (doc.exists) {
            const movieList = doc.data();
            return {
                listId: doc.id,
                ...movieList
            };

        } else {
            return null;
        }
    },

    async createMoviesList(userId) {
        return await firebase.firestore
            .collection("lists")
            .add({
                movieIds: [],
                userId: userId
            })
    },

    async updateMoviesList(moviesList) {
        return await firebase.firestore
            .collection("lists")
            .doc(moviesList.listId)
            .update({
                movieIds: moviesList.movieIds
            });
    },

    async getUser() {
        return new Promise((resolve, reject) => {
            const unsubscribe = firebase.auth.onAuthStateChanged(user => {
                unsubscribe();
                resolve(user);
            }, reject);
        })
    },

    async signIn() {
        var provider = firebase.googleAuthProvider;
        await firebase.auth.signInWithRedirect(provider);
    },

    async signOut() {
        await firebase.auth.signOut();
    },
}
