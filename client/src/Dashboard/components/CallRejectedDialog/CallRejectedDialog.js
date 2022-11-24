import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCallRejected } from '../../../redux/features/callSlice';

import './CallRejectedDialog.css';

const CallRejectedDialog = ({ reason }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      // hideCallRejectedDialog({
      //   rejected: false,
      //   reason: ''
      // });
      dispatch(setCallRejected({
        rejected: false,
        reason: ''
      }));
    }, [4000]);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='call_rejected_dialog background_secondary_color'>
      <span>
        {reason}
      </span>
    </div>
  );
};

export default CallRejectedDialog;
