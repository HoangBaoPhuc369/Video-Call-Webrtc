import React from "react";
import GroupCallButton from "../GroupCallButton/GroupCallButton";
import * as webRTCGroupCallHandler from "../../../utils/webRTC/webRTCGroupCallHandler";
import GroupCallRoom from "../GroupCallRoom/GroupCallRoom";
import { useSelector } from "react-redux";

const GroupCall = () => {
  const { callState, localStream, groupCallActive } = useSelector((state) => ({
    ...state.call,
  }));

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  return (
    <>
      {!groupCallActive && localStream && callState !== "CALL_IN_PROGRESS" && (
        <GroupCallButton onClickHandler={createRoom} label="Create room" />
      )}
      {groupCallActive && <GroupCallRoom />}
    </>
  );
};

export default GroupCall;
