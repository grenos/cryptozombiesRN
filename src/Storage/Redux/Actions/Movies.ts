import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../Store';
import { fetchMovies } from '~Api';
import { ITest } from '~Types';

export const getMovies = createAsyncThunk<ITest[]>(
    'Movies/Fetch Movies',
    async (_, thunkApi) => {
        const { moviesSlice } = thunkApi.getState() as RootState;
        const { currentRequestId } = moviesSlice;
        if (thunkApi.requestId !== currentRequestId) {
            return thunkApi.rejectWithValue('Request still in loading state');
        }

        let response = await fetchMovies();
        return response.movies as ITest[];
    },
);
