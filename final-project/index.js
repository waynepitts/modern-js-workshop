// import bricks from "bricks.js";
import { findSomeMoviePosters, findMovie } from "./movieData";
import tingle from "tingle.js";

const button = document.getElementById("search-button");

const addPosterBricks = async (searchTerm) => {
    const moviePosters = await findSomeMoviePosters(`${searchTerm}`);

    document.getElementById("search-results").innerHTML = moviePosters.join("");
};

const modal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ["overlay", "button", "escape"],
    closeLabel: "Close",
    cssClass: ["custom-class-1", "custom-class-2"],
});

const addClickHandlers = () => {
    const posters = document.querySelectorAll(".movie-poster");

    posters.forEach(async (element) => {
        element.onclick = async () => {
            const movie = await findMovie(element.id);

            modal.setContent(`<h1>${movie.Title}</h1><p>${movie.Plot}</p>`);
            modal.open();
        };
    });
};

const clickHandler = () => {
    const textField = document.getElementById("search-movies");

    // document.getElementById("search-results").innerHTML = textField.value;

    addPosterBricks(textField.value).then(addClickHandlers);
};

button.onclick = clickHandler;
