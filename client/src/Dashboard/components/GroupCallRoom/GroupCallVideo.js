import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const styles = {
  videoContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  videoElement: {
    width: "100%",
    position: "relative",
    top: 0,
    left: 0,
    opacity: 1,
  },
};

const GroupCallVideo = ({ stream }) => {
  const videoRef = useRef();
  const videoShareRef = useRef();

  const { remoteScreenShareStream } = useSelector((state) => ({
    ...state.call,
  }));

  useEffect(() => {
    const remoteGroupCallVideo = videoRef.current;
    remoteGroupCallVideo.srcObject = stream;
    remoteGroupCallVideo.onloadedmetadata = () => {
      remoteGroupCallVideo.play();
    };
  }, [stream]);

  useEffect(() => {
    if (remoteScreenShareStream) {
      console.log(remoteScreenShareStream);
      const remoteShareGroupCallVideo = videoShareRef.current;
      remoteShareGroupCallVideo.srcObject = remoteScreenShareStream;
      remoteShareGroupCallVideo.onloadedmetadata = () => {
        remoteShareGroupCallVideo.play();
      };
    }
  }, [remoteScreenShareStream]);

  return (
    <div style={styles.videoContainer}>
      <video ref={videoRef} autoPlay style={styles.videoElement} />
      {remoteScreenShareStream ? (
        <video ref={videoShareRef} autoPlay style={styles.videoElement} />
      ) : null}
    </div>
  );
};

export default GroupCallVideo;
