import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import addUserReducer from './addUserSlice';
import authReducer from './authSlice';
import coopUnionReducer from './coopUnionSlice';
import counterReducer from './counterSlice';
import loanSettingReducer from './loanSettingsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    loanSettings: loanSettingReducer,
    addUser: addUserReducer,
    coopUnion: coopUnionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
