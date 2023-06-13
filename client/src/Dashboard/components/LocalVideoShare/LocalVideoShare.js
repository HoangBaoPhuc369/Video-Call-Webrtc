import "./style.css";
import { useRef, useEffect } from "react";

export default function LocalVideoShare({
  localScreenShareStream,
  handleScreenSharingButtonPressed,
}) {
  const localVideoShareRef = useRef();

  useEffect(() => {
    if (localScreenShareStream) {
      const localVideoShare = localVideoShareRef.current;
      localVideoShare.srcObject = localScreenShareStream;

      localVideoShare.onloadedmetadata = () => {
        localVideoShare.play();
      };
    }
  }, [localScreenShareStream]);
  return (
    <div className="local_video_container_share local_video_share hover-video">
      <button
        className="local_video_container_btn"
        onClick={handleScreenSharingButtonPressed}
      >
        Stop
      </button>
      <video
        className="local_video_element"
        ref={localVideoShareRef}
        autoPlay
        muted
      />
    </div>
  );
}
