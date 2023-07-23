import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { v4 } from "uuid";

import socket from "../../socket";
import ACTIONS from "../../socket/actions";

const Main = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const rootNodeRef = useRef();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms } = []) => {
      if (rootNodeRef.current) {
        setRooms(rooms);
      }
    });
  }, []);

  const joinRoomHandler = (roomID) => {
    navigate(`/room/${roomID}`);
  };
  const createNewRoomHandler = () => {
    navigate(`/room/${v4()}`);
  };

  return (
    <div ref={rootNodeRef}>
      <h1>Available rooms</h1>
      <ul>
        {rooms.map((roomID) => (
          <li key={roomID}>
            {roomID}
            <button onClick={() => joinRoomHandler(roomID)}>Join room</button>
          </li>
        ))}
      </ul>
      <button onClick={createNewRoomHandler}>Create new room</button>
    </div>
  );
};

export default Main;
