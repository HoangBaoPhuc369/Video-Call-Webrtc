import React, { useEffect } from "react";
import logo from "../resources/logo.png";
import ActiveUsersList from "./components/ActiveUsersList/ActiveUsersList";
import * as webRTCHandler from "../utils/webRTC/webRTCHandler";
import * as webRTCGroupHandler from "../utils/webRTC/webRTCGroupCallHandler";
import DirectCall from "./components/DirectCall/DirectCall";
import { useSelector } from "react-redux";
import DashboardInformation from "./components/Dashboardinformation/Dashboardinformation";
import GroupCallRoomsList from "./components/GroupCallRoomsList/GroupCallRoomsList";
import GroupCall from "./components/GroupCall/GroupCall";
import "./Dashboard.css";
import { registerNewUser } from "../utils/wssConnection/wssConnection";

const Dashboard = ({ socket }) => {
  const { username, groupCallRooms } = useSelector((state) => ({
    ...state.dashboard,
  }));
  const { callState } = useSelector((state) => ({ ...state.call }));

  // let url = "http://localhost:3000/?roomId=12345&username=PhucHoang&userPicture=https://res.cloudinary.com/da2c2nw4m/image/upload/v1667266412/facebook-clone/PhucHoang_Ns8BbJoJo/profile_pictures/hkutn8wxbqdhh47nsg2c.jpg&friendName=Anna&friendPicture=&type=host";
  // let url = "http://localhost:3000/?roomId=12345&username=PhucHoang&type=host";
  // let url = "http://localhost:3000/?roomId=12345&username=JohnDoe&type=joiner";
  let url = window.location.href;
  let paramaters = new URL(url).searchParams;
  var roomId = paramaters.get("roomId");
  var name = paramaters.get("username");
  // var picture = paramaters.get("userPicture");
  var type = paramaters.get("type");

  useEffect(() => {
    if (socket) {
      if (name) {
        registerNewUser(name);
      } else {
        registerNewUser("anonymous");
      }
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function myDisplay() {
      const response = (x) => {
        if (x === "ok") {
          webRTCGroupHandler.connectWithMyPeer(roomId, type);
        }
      };
      webRTCHandler.getLocalStream(response);
    }
    myDisplay();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="dashboard_container background_main_color">
        <div className="dashboard_content_container">
          <DirectCall />
          <GroupCall roomId={roomId} />
          {callState !== "CALL_IN_PROGRESS" && (
            <DashboardInformation username={username} />
          )}
        </div>
        {/* <div className="dashboard_left_section">
          <div className="dashboard_rooms_container background_secondary_color">
            <GroupCallRoomsList />
          </div>
        </div>
        <div className="dashboard_right_section background_secondary_color">
          <div className="dashboard_active_users_list">
            <ActiveUsersList />
          </div>
          <div className="dashboard_logo_container">
            <img className="dashboard_logo_image" src={logo} alt="logo" />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
