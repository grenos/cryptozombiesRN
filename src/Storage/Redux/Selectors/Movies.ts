import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { ITest } from '~Types';

const reducer = (state: RootState) => state.moviesSlice;

export const getMovies = createSelector(reducer, state => state.movies);

export const getMoviesLoadingState = createSelector(
    reducer,
    state => state.loading,
);

export const getGenres = createSelector(reducer, state => {
    const { movies } = state;
    return movies;
});

export const getSuggestedMovie = createSelector(
    [
        (state: RootState) => state.moviesSlice.movies,
        (_, movieTitle) => movieTitle,
    ],
    (movies, movieTitle) => {
        let movie: ITest | undefined;
        if (movieTitle.length) {
            movie = movies.find((mv: ITest) => mv);
        }
        return movie;
    },
);
