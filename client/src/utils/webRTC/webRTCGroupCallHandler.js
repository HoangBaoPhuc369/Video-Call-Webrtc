import * as wss from "../wssConnection/wssConnection";
import {
  clearGroupCallData,
  setCallState,
  setGroupCallActive,
  setGroupCallStreams,
  setLocalScreenShareStream,
  setScreenSharingActive,
  setSharingStreams,
} from "../../redux/features/callSlice";
import { store } from "./../../app/store";
import { setPeersIdConnection } from "../../redux/features/dashboardSlice";

let myPeer;
let myPeerId;
let groupCallRoomId;
let groupCallHost = false;

let videoConstraints = {
  width: { ideal: 4096 },
  height: { ideal: 2160 },
  frameRate: { ideal: 10, max: 15 },
};

export const connectWithMyPeer = (roomId, type) => {
  myPeer = new window.Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "5001",
  });

  myPeer.on("open", (id) => {
    console.log("succesfully connected with peer server");
    myPeerId = id;

    if (store.getState().call.callState === "CALL_AVAILABLE") {
      if (type === "host") {
        console.log("create room");
        createNewGroupCall(roomId);
      } else {
        console.log("join room");
        joinGroupCall(roomId);
      }
    }
  });

  myPeer.on("call", (call) => {
    call.answer(store.getState().call.localStream);
    call.on("stream", (incomingStream) => {
      const streams = store.getState().call.groupCallStreams;
      const stream = streams.find((stream) => stream.id === incomingStream.id);

      if (!stream) {
        addVideoStream(incomingStream);
      }
    });
  });
};

export const createNewGroupCall = (roomId) => {
  groupCallHost = true;
  wss.registerGroupCall({
    username: "test", //store.getState().dashboard.username
    peerId: myPeerId,
    roomId: roomId,
  });

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState("CALL_IN_PROGRESS"));
};

export const joinGroupCall = (roomId) => {
  //hostSocketId,
  groupCallRoomId = roomId;

  wss.userWantsToJoinGroupCall({
    peerId: myPeerId,
    roomId,
  });

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState("CALL_IN_PROGRESS"));
};

export const connectToNewUser = (data) => {
  const localStream = store.getState().call.localStream;

  const call = myPeer.call(data.peerId, localStream);

  // store.dispatch(setPeersIdConnection(data.peerId));

  call.on("stream", (incomingStream) => {
    const streams = store.getState().call.groupCallStreams;
    const stream = streams.find((stream) => stream.id === incomingStream.id);
    // console.log(stream);
    if (!stream) {
      addVideoStream(incomingStream);
    }
  });
};

// export const handleShareScreen = (data) => {
//   const localStream = store.getState().call.localStream;

//   const call = myPeer.call(data.peerId, localStream);

//   call.on("stream", (incomingStream) => {
//     const streams = store.getState().call.groupCallStreams;
//     const stream = streams.find((stream) => stream.id === incomingStream.id);
//     // console.log(stream);
//     if (!stream) {
//       addVideoStream(incomingStream);
//     }
//   });
// };

let screenSharingStream;

export const switchForScreenSharingStream = async (roomId) => {
  if (!store.getState().call.screenSharingActive) {
    try {
      screenSharingStream = await navigator.mediaDevices.getDisplayMedia({
        video: videoConstraints,
      });
      store.dispatch(setScreenSharingActive(true));
      store.dispatch(setLocalScreenShareStream(screenSharingStream));
      // wss.groupCallSharing({
      //   roomId: roomId,
      //   screenSharingStream,
      // });
    } catch (err) {
      console.error(
        "error occured when trying to get screen sharing stream",
        err
      );
    }
  } else {
    store.dispatch(setScreenSharingActive(false));
    screenSharingStream.getTracks().forEach((track) => track.stop());
  }
};

export const leaveGroupCall = () => {
  if (groupCallHost) {
    wss.groupCallClosedByHost({
      peerId: myPeerId,
    });
  } else {
    // console.log(groupCallRoomId);
    wss.userLeftGroupCall({
      streamId: store.getState().call.localStream.id,
      roomId: groupCallRoomId,
    });
  }
  clearGroupData();
  window.close();
};

export const clearGroupData = () => {
  groupCallRoomId = null;
  groupCallHost = null;
  store.dispatch(clearGroupCallData());
  myPeer.destroy();
  connectWithMyPeer();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;
};

export const removeInactiveStream = (data) => {
  //error can occured in here
  const groupCallStreams = store
    .getState()
    .call.groupCallStreams.filter((stream) => stream.id !== data.streamId);
  store.dispatch(setGroupCallStreams(groupCallStreams));
};

const addVideoStream = (incomingStream) => {
  const groupCallStreams = [
    ...store.getState().call.groupCallStreams,
    incomingStream,
  ];

  store.dispatch(setGroupCallStreams(groupCallStreams));
};

export const handleShareStream = (data) => {
  store.dispatch(setSharingStreams(data));
};

// if group call is active return roomId if not return false
export const checkActiveGroupCall = () => {
  if (store.getState().call.groupCallActive) {
    return groupCallRoomId;
  } else {
    return false;
  }
};
