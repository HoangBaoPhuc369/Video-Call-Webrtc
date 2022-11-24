import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

const initialState = {
  username: "",
  activeUsers: [],
  groupCallRooms: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.user = action.payload;
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    setGroupCallRooms: (state, action) => {
      state.groupCallRooms = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsername, setActiveUsers, setGroupCallRooms } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
