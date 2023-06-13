import React from "react";
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdVideoLabel,
  MdCamera,
} from "react-icons/md";
import ConversationButton from "./ConversationButton";
// import { switchForScreenSharingStream } from "../../../utils/webRTC/webRTCHandler";
import { useSelector, useDispatch } from "react-redux";
import {
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from "../../../redux/features/callSlice";
import LocalVideoView from "./../LocalVideoView/LocalVideoView";
import * as webRTCGroupCallHandler from "../../../utils/webRTC/webRTCGroupCallHandler";
import "./style.css";
import LocalVideoShare from "../LocalVideoShare/LocalVideoShare";
import { switchForScreenSharingStream } from "../../../utils/webRTC/webRTCGroupCallHandler";

const styles = {
  icon: {
    width: "25px",
    height: "25px",
    fill: "#e6e5e8",
  },
};

const ConversationButtons = ({ roomId }) => {
  const {
    localStream,
    localScreenShareStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    groupCallActive,
    screenSharingActive,
    groupCall,
  } = useSelector((state) => ({ ...state.call }));

  const dispatch = useDispatch();

  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    dispatch(setLocalMicrophoneEnabled(!micEnabled));
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    dispatch(setLocalCameraEnabled(!cameraEnabled));
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream(roomId);
  };

  // const handleHangUpButtonPressed = () => {
  //   hangUp();
  // };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };

  return (
    <div className="button_container">
      <div className="button_container_item_hidden"></div>
      <div className="button_container_item">
        <ConversationButton onClickHandler={handleMicButtonPressed}>
          {localMicrophoneEnabled ? (
            <MdMic style={styles.icon} />
          ) : (
            <MdMicOff style={styles.icon} />
          )}
        </ConversationButton>
        {groupCallActive && (
          <ConversationButton onClickHandler={leaveRoom}>
            <MdCallEnd style={styles.icon} />
          </ConversationButton>
        )}
        <ConversationButton onClickHandler={handleCameraButtonPressed}>
          {localCameraEnabled ? (
            <MdVideocam style={styles.icon} />
          ) : (
            <MdVideocamOff style={styles.icon} />
          )}
        </ConversationButton>
        {!groupCall && (
          <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
            {screenSharingActive ? (
              <MdCamera style={styles.icon} />
            ) : (
              <MdVideoLabel style={styles.icon} />
            )}
          </ConversationButton>
        )}
      </div>

      <div className="local_video_group">
        {screenSharingActive ? (
          <LocalVideoShare
            localScreenShareStream={localScreenShareStream}
            handleScreenSharingButtonPressed={handleScreenSharingButtonPressed}
          />
        ) : null}
        <LocalVideoView localStream={localStream} />
      </div>
    </div>
  );
};

export default ConversationButtons;
