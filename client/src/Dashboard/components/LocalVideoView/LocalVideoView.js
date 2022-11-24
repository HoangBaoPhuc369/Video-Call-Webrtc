import { useRef, useEffect } from 'react';
import './style.css'

const LocalVideoView = props => {
  const { localStream } = props;
  const localVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);

  return (
    <div  className='local_video_container background_secondary_color'>
      <video  className='local_video_element' ref={localVideoRef} autoPlay muted />
    </div>
  );
};

export default LocalVideoView;
