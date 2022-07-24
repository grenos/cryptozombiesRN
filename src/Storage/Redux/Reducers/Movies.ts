import { createSlice } from '@reduxjs/toolkit';
import { ITodo } from '~Types';
import { getTodo } from '../Actions';

export interface MoviesState {
    todo: ITodo | {};
    loading: boolean;
    currentRequestId?: string;
    error: string;
    isError: boolean;
}

const initialState: MoviesState = {
    todo: {},
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
            state.todo = action.payload;
        });
    },
});
