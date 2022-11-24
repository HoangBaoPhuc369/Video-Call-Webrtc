import React from "react";
import { useSelector } from "react-redux";
import RemoteVideoView from "../RemoteVideoView/RemoteVideoView";
import CallRejectedDialog from "../CallRejectedDialog/CallRejectedDialog";
import IncomingCallDialog from "../IncomingCallDialog/IncomingCallDialog";
import CallingDialog from "../CallingDialog/CallingDialog";

import ConversationButtons from "../ConversationButtons/ConversationButtons";
import Messenger from "../Messenger/Messenger";

const DirectCall = () => {

  const {
    remoteStream,
    callState,
    callerUsername,
    callingDialogVisible,
    callRejected,
    message,
  } = useSelector((state) => ({ ...state.call }));

  return (
    <>
      {remoteStream && callState === "CALL_IN_PROGRESS" && (
        <RemoteVideoView remoteStream={remoteStream} />
      )}
      {callRejected.rejetced && (
        <CallRejectedDialog
          reason={callRejected.reason}
        />
      )}
      {callState === "CALL_REQUESTED" && (
        <IncomingCallDialog callerUsername={callerUsername} />
      )}
      {callingDialogVisible && <CallingDialog />}
      {remoteStream && callState === "CALL_IN_PROGRESS" && (
        <ConversationButtons />
      )}
      {remoteStream && callState === "CALL_IN_PROGRESS" && (
        <Messenger
          message={message}
        />
      )}
    </>
  );
};

export default (DirectCall);
