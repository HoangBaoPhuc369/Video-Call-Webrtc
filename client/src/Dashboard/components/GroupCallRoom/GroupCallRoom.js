import React from 'react';
import { useSelector } from 'react-redux';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
import './GroupCallRoom.css';
import GroupCallVideo from './GroupCallVideo';

const GroupCallRoom = ({roomId}) => {
  const { groupCallStreams } =
    useSelector((state) => ({ ...state.call }));
  return (
    <div className='group_call_room_container'>
      <div className='group_call_videos_container'>
        {
          groupCallStreams.map(stream => {
            return <GroupCallVideo key={stream.id} stream={stream} />;
          })
        }
      </div>
      <ConversationButtons roomId={roomId} />
    </div>
  );
};

export default GroupCallRoom;
