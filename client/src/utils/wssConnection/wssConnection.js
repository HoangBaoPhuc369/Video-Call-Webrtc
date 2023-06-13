import socketClient from "socket.io-client";
// import store from '../../store/store';
// import * as dashboardActions from '../../store/actions/dashboardActions';
import * as webRTCHandler from "../webRTC/webRTCHandler";
import * as webRTCGroupCallHandler from "../webRTC/webRTCGroupCallHandler";
import { store } from "./../../app/store";
import {
  setActiveUsers,
  setGroupCallRooms,
} from "../../redux/features/dashboardSlice";

const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

let socket;

export const connectWithWebSocket = (newSocket) => {
  socket = newSocket;

  socket.on("connection", () => {
    console.log("succesfully connected with wss server");
    console.log(socket.id);
  });

  socket.on("broadcast", (data) => {
    handleBroadcastEvents(data);
  });

  // listeners related with direct call
  socket.on("pre-offer", (data) => {
    webRTCHandler.handlePreOffer(data);
  });

  socket.on("pre-offer-answer", (data) => {
    webRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on("webRTC-offer", (data) => {
    webRTCHandler.handleOffer(data);
  });

  socket.on("webRTC-answer", (data) => {
    webRTCHandler.handleAnswer(data);
  });

  socket.on("webRTC-candidate", (data) => {
    webRTCHandler.handleCandidate(data);
  });

  socket.on("user-hanged-up", () => {
    webRTCHandler.handleUserHangedUp();
  });

  // listeners related with group calls

  socket.on("group-call-join-request", (data) => {
    // console.log(data);
    webRTCGroupCallHandler.connectToNewUser(data);
  });

  socket.on("group-call-user-left", (data) => {
    webRTCGroupCallHandler.removeInactiveStream(data);
  });

  socket.on("group-call-sharing", (data) => {
    webRTCGroupCallHandler.handleShareStream(data);
  });
};

export const registerNewUser = (username) => {
  socket.emit("register-new-user", {
    username: username,
    socketId: socket.id,
  });
};

// emitting events to server related with direct call

export const sendPreOffer = (data) => {
  socket.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
  socket.emit("pre-offer-answer", data);
};

export const sendWebRTCOffer = (data) => {
  socket.emit("webRTC-offer", data);
};

export const sendWebRTCAnswer = (data) => {
  socket.emit("webRTC-answer", data);
};

export const sendWebRTCCandidate = (data) => {
  socket.emit("webRTC-candidate", data);
};

export const sendUserHangedUp = (data) => {
  socket.emit("user-hanged-up", data);
};

// emitting events related with group calls

export const registerGroupCall = (data) => {
  socket.emit("group-call-register", data);
};

export const userWantsToJoinGroupCall = (data) => {
  // console.log(data);
  socket.emit("group-call-join-request", data);
};

export const userLeftGroupCall = (data) => {
  // console.log(data)
  socket.emit("group-call-user-left", data);
};

export const groupCallClosedByHost = (data) => {
  socket.emit("group-call-closed-by-host", data);
};

export const groupCallSharing = (data) => {
  socket.emit("group-call-sharing", data);
};

const handleBroadcastEvents = (data) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      const activeUsers = data.activeUsers.filter(
        (activeUser) => activeUser.socketId !== socket.id
      );
      store.dispatch(setActiveUsers(activeUsers));
      break;
    case broadcastEventTypes.GROUP_CALL_ROOMS:
      // console.log(data.groupCallRooms)
      const groupCallRooms = data.groupCallRooms.filter(
        (room) => room.socketId !== socket.id
      );
      const activeGroupCallRoomId =
        webRTCGroupCallHandler.checkActiveGroupCall();

      if (activeGroupCallRoomId) {
        const room = groupCallRooms.find(
          (room) => room.roomId === activeGroupCallRoomId
        );
        if (!room) {
          webRTCGroupCallHandler.clearGroupData();
        }
      }
      store.dispatch(setGroupCallRooms(groupCallRooms));
      break;
    default:
      break;
  }
};
