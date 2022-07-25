import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';

const reducer = (state: RootState) => state.moviesSlice;

export const selectTodo = createSelector(reducer, state => {
    return {
        data: state.todo,
        loading: state.loading,
        error: state.error,
        isError: state.isError,
    };
});
export const selectTodos = createSelector(reducer, state => {
    return {
        data: state.todos,
        loading: state.loading,
        error: state.error,
        isError: state.isError,
    };
});

// export const getMoviesLoadingState = createSelector(
//     reducer,
//     state => state.loading,
// );

// export const getGenres = createSelector(reducer, state => {
//     const { movies } = state;
//     return movies;
// });

// export const getSuggestedMovie = createSelector(
//     [
//         (state: RootState) => state.moviesSlice.movies,
//         (_, movieTitle) => movieTitle,
//     ],
//     (movies, movieTitle) => {
//         let movie: ITest | undefined;
//         if (movieTitle.length) {
//             movie = movies.find((mv: ITest) => mv);
//         }
//         return movie;
//     },
// );
