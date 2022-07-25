import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../Store';
import { FetchOne, Post } from '~Api';
import { ITodo } from '~Types';

export const getTodo = createAsyncThunk<unknown, string>(
    'Todo/Fetch Todo',
    async (endpoint, thunkApi) => {
        const { moviesSlice } = thunkApi.getState() as RootState;
        const { currentRequestId } = moviesSlice;

        if (thunkApi.requestId !== currentRequestId) {
            return thunkApi.rejectWithValue('Request still in loading state');
        }

        try {
            let response = await FetchOne<ITodo>(endpoint);
            return thunkApi.fulfillWithValue(response);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkApi.rejectWithValue(error.message);
            }
            return thunkApi.rejectWithValue('Uknown Error');
        }
    },
);

export const getTodos = createAsyncThunk<unknown, string>(
    'Todo/Fetch Todos',
    async (endpoint, thunkApi) => {
        const { moviesSlice } = thunkApi.getState() as RootState;
        const { currentRequestId } = moviesSlice;

        if (thunkApi.requestId !== currentRequestId) {
            return thunkApi.rejectWithValue('Request still in loading state');
        }

        try {
            let response = await FetchOne<ITodo[]>(endpoint);
            return thunkApi.fulfillWithValue(response);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkApi.rejectWithValue(error.message);
            }
            return thunkApi.rejectWithValue('Uknown Error');
        }
    },
);

export const createTodo = createAsyncThunk<
    unknown,
    { endpoint: string; todo: ITodo }
>('Todo/Post Todo', async ({ endpoint, todo }, thunkApi) => {
    try {
        const isPost: boolean = await Post(endpoint, todo);
        return thunkApi.fulfillWithValue(isPost);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return thunkApi.rejectWithValue(error.message);
        }
        return thunkApi.rejectWithValue('Uknown Error');
    }
});
