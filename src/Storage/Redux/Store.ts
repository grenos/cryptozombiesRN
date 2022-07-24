import { configureStore } from '@reduxjs/toolkit';
import { MoviesSlice } from './Reducers';

const reducer = {
    moviesSlice: MoviesSlice.reducer,
};

const createDebugger = require('redux-flipper').default;

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(createDebugger()),
    devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
