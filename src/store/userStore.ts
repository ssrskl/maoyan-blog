import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser ,clearUser} = userSlice.actions;

const userStore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default userStore;
