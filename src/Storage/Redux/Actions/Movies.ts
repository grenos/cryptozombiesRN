import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../Store';
import { Fetch } from '~Api';
import { ITodo } from '~Types';

export const getTodo = createAsyncThunk(
    'Todo/Fetch Todo',
    async (_, thunkApi) => {
        const { moviesSlice } = thunkApi.getState() as RootState;
        const { currentRequestId } = moviesSlice;

        if (thunkApi.requestId !== currentRequestId) {
            return thunkApi.rejectWithValue('Request still in loading state');
        }

        try {
            let response = await Fetch<ITodo>();
            return thunkApi.fulfillWithValue(response);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkApi.rejectWithValue(error.message);
            }
            return thunkApi.rejectWithValue('Uknown Error');
        }
    },
);
