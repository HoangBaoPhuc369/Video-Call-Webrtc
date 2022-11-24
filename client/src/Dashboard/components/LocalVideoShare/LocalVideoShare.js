import "./style.css";
import { useRef, useEffect } from "react";

export default function LocalVideoShare({ localScreenShareStream }) {
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
    <div className="local_video_container local_video_share">
      <button className="local_video_container_btn">Stop</button>
      <video
        className="local_video_element"
        ref={localVideoShareRef}
        // width="300" 
        // height="150" 
        autoPlay
        muted
      />
    </div>
  );
}
