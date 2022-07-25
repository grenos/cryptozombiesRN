import { createSlice } from '@reduxjs/toolkit';
import { ITodo } from '~Types';
import { getTodo, getTodos } from '../Actions';

export interface MoviesState {
    todo: ITodo | {};
    todos: ITodo[] | [];
    loading: boolean;
    currentRequestId?: string;
    error: string;
    isError: boolean;
}

const initialState: MoviesState = {
    todo: {},
    todos: [],
    loading: false,
    currentRequestId: undefined,
    error: '',
    isError: false,
};

export const MoviesSlice = createSlice({
    name: 'Movies',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(getTodo.pending, (state, action) => {
            state.loading = true;
            state.error = '';
            state.isError = false;
            state.currentRequestId = action.meta.requestId;
        });
        builder.addCase(getTodo.rejected, (state, action) => {
            state.loading = false;
            state.currentRequestId = undefined;
            state.error = action.payload as string;
            state.isError = true;
        });
        builder.addCase(getTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.currentRequestId = undefined;
            state.error = '';
            state.isError = false;
            state.todo = action.payload as ITodo;
        });

        //

        builder.addCase(getTodos.pending, (state, action) => {
            state.loading = true;
            state.error = '';
            state.isError = false;
            state.currentRequestId = action.meta.requestId;
        });
        builder.addCase(getTodos.rejected, (state, action) => {
            state.loading = false;
            state.currentRequestId = undefined;
            state.error = action.payload as string;
            state.isError = true;
        });
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.currentRequestId = undefined;
            state.error = '';
            state.isError = false;
            state.todos = action.payload as ITodo[];
        });
    },
});
