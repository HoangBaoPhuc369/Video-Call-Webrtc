import React from 'react';
import ActiveUsersListItem from './ActiveUsersListItem';
import { connect } from 'react-redux';

import './ActiveUsersList.css';
import { useSelector } from 'react-redux';

const ActiveUsersList = () => {
  const { activeUsers } = useSelector((state) => ({ ...state.dashboard }));
  const { callState } = useSelector((state) => ({ ...state.call }));

  return (
    <div className='active_user_list_container'>
      {activeUsers.map((activeUser) =>
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
          callState={callState}
        />)}
    </div>
  );
};

// const mapStateToProps = ({ dashboard, call }) => ({
//   ...dashboard,
//   ...call
// });

export default (ActiveUsersList);
