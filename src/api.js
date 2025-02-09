import _ from "lodash";
import axios from "axios";
import { db, auth, googleAuthProvider } from "@/firebase.js";
import store from "@/store";
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, doc, getDoc, updateDoc, limit } from "firebase/firestore";

onAuthStateChanged(auth, (user) => {
    store.commit("setUser", user);
})

const apiKey = "a8f551fd12a4b1c7e0039f0463f640a5";

function getImageUrl(path) {
    return `https://image.tmdb.org/t/p/w500${path}?api_key=${apiKey}`
}

export default {
    searchMovies: _.memoize(async function (title) {
        const url = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${apiKey}`
        const response = await axios.get(url);
        return response.data;
    }),

    getMovie: _.memoize(async function (id) {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        const response = await axios.get(url);
        const movie = response.data;
        return {
            posterUrl: getImageUrl(movie["poster_path"]),
            backdropUrl: getImageUrl(movie["backdrop_path"]),
            ...movie
        };
    }),

    async getMovieListId(userId) {
        const querySnapshot = await getDocs(
            query(
                collection(db, "lists"), 
                where("userId", "==", userId),
                limit(1)
            )
        )

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].id;

        } else {
            const docReference = await this.createMovieList(userId);
            return docReference.id;
        }
    },

    async getMovieList(listId) {
        const docSnapshot = await getDoc(
            doc(db, "lists", listId)
        )

        if (docSnapshot.exists()) {
            const movieList = docSnapshot.data();
            return {
                listId: docSnapshot.id,
                ...movieList
            };

        } else {
            return null;
        }
    },

    async createMovieList(userId) {
        return await addDoc(collection(db, "lists"), {
            movieIds: [],
            userId: userId
        });
    },

    async updateMovieList(movieList) {
        return await updateDoc(
            doc(db, "lists", movieList.listId), 
            { movieIds: movieList.movieIds }
        );
    },

    async getUser() {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
            }, reject);
        })
    },

    async signIn() {
        if (process.env.NODE_ENV === 'development') {
            // Cannot get SSL working with redirect in local development
            // Watch for blocked popups, set to always allow, then refresh page
            await signInWithPopup(auth, googleAuthProvider);
        } else {
            await signInWithRedirect(auth, googleAuthProvider);
        }
        
    },

    async signOut() {
        await signOut(auth);
    },
}
