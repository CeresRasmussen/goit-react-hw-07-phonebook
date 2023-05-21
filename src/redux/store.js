import { configureStore } from '@reduxjs/toolkit';

import { contactReducer } from './contactSlice';
import { filterReducer } from './sliceFilter';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filters: filterReducer,
  },
});
