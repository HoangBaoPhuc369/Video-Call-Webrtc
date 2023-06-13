import React from 'react';
import GroupCallRoomsListItem from './GroupCallRoomsListItem';
import { connect } from 'react-redux';
import './GroupCallRoomsList.css';
import { useSelector } from 'react-redux';

const GroupCallRoomsList = () => {
  // const { groupCallRooms } = props;
  const { groupCallRooms } = useSelector((state) => ({ ...state.dashboard }));
  return (
    <>
      {groupCallRooms.map(room => <GroupCallRoomsListItem key={room.roomId} room={room} />)}
    </>
  );
};

export default (GroupCallRoomsList);
