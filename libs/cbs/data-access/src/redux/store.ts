import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import addUserReducer from './slices/add-user-slice';
import authReducer from './slices/auth-slice';
import coopUnionReducer from './slices/coop-union-slice';
import individualReducer from './slices/individual-slice';
import institutionReducer from './slices/institution-slice';
import loanSettingsReducer from './slices/loan-settings-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addUser: addUserReducer,
    loanSettings: loanSettingsReducer,
    coopUnion: coopUnionReducer,
    individual: individualReducer,
    institution: institutionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
