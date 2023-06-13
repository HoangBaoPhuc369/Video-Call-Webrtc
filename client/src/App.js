import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { connectWithWebSocket } from "./utils/wssConnection/wssConnection";
import Dashboard from "./Dashboard/Dashboard";
import LoginPage from "./LoginPage/LoginPage";
import { io } from "socket.io-client";

function App() {
  const SERVER = "http://localhost:5001";

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SERVER, {
      transports: ["polling"],
    });

    newSocket.on("connect", function () {
      setSocket(newSocket);
      connectWithWebSocket(newSocket);
    });

    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/">{socket ? <Dashboard socket={socket} /> : null}</Route>
        <Route path="/dashboard">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
