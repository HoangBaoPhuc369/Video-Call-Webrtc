import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

const initialState = {
  localStream: null,
  callState: "CALL_UNAVAILABLE",
  callingDialogVisible: false,
  callerUsername: "",
  callRejected: {
    rejected: false,
    reason: "",
  },
  remoteStream: null,
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  screenSharingActive: false,
  groupCallActive: false,
  groupCallStreams: [],
  localScreenShareStream: null,
  remoteScreenShareStream: null,
  message: {
    received: false,
    content: "",
  },
};

export const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },

    setLocalScreenShareStream: (state, action) => {
      state.localScreenShareStream = action.payload;
    },

    setCallState: (state, action) => {
      state.callState = action.payload;
    },

    setCallingDialogVisible: (state, action) => {
      state.callingDialogVisible = action.payload;
    },

    setCallerUser: (state, action) => {
      state.callerUser = action.payload;
    },

    setCallRejected: (state, action) => {
      state.callRejected = action.payload;
    },

    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },

    setLocalCameraEnabled: (state, action) => {
      state.localCameraEnabled = action.payload;
    },

    setLocalMicrophoneEnabled: (state, action) => {
      state.localMicrophoneEnabled = action.payload;
    },

    setScreenSharingActive: (state, action) => {
      state.screenSharingActive = action.payload;
    },

    resetCallState: (state) => {
      state.callingDialogVisible = false;
      state.callerUsername = "";
      state.remoteStream = null;
      state.localCameraEnabled = true;
      state.localMicrophoneEnabled = true;
      state.screenSharingActive = false;
    },

    setGroupCallActive: (state, action) => {
      state.groupCallActive = action.payload;
    },

    setGroupCallStreams: (state, action) => {
      state.groupCallStreams = action.payload;
    },

    getCallUser: (state, action) => {
      state.callUser = action.payload;
    },

    clearGroupCallData: (state, action) => {
      state.groupCallActive = false;
      state.groupCallStreams = [];
      state.callState = "CALL_AVAILABLE";
      state.localMicrophoneEnabled = true;
      state.localCameraEnabled = true;
    },

    setChatMessage: (state, action) => {
      state.message = action.payload;
    },

    setSharingStreams: (state, action) => {
      state.remoteScreenShareStream = action.payload;
    },
  },
});

export const {
  setLocalStream,
  setLocalScreenShareStream,
  setCallState,
  setCallingDialogVisible,
  setCallerUser,
  setCallRejected,
  setRemoteStream,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
  setScreenSharingActive,
  setGroupCallActive,
  setGroupCallStreams,
  clearGroupCallData,
  setChatMessage,
  resetCallState,
  setSharingStreams,
} = callSlice.actions;

export default callSlice.reducer;
