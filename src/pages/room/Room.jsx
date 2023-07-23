import React from "react";
import { useParams } from "react-router";
import useWebRTC, { LOCAL_VIDEO } from "../../hooks/useWebRTC";

const layout = (clientsNumber = 1) => {
  const pairs = Array.from({ length: clientsNumber }).reduce(
    (acc, _, index, arr) => {
      if (!(index % 2)) acc.push(arr.slice(index, index + 2));
      return acc;
    },
    []
  );

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;

  return pairs
    .map((row, index, arr) => {
      return index === arr.length - 1 && row.length === 1
        ? [{ width: "100%", height }]
        : row.map(() => ({ width: "50%", height }));
    })
    .flat();
};

const Room = () => {
  const { id: roomID } = useParams();
  const { clients, provideMediaRef } = useWebRTC(roomID);

  const videoLayout = layout(clients.length);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        height: "100vh",
      }}
    >
      {clients.map((clientID, index) => (
        <div key={clientID} style={videoLayout[index]}>
          <video
            width="100%"
            height="100%"
            ref={(instance) => provideMediaRef(clientID, instance)}
            autoPlay
            playsInline
            muted={clientID === LOCAL_VIDEO}
          />
        </div>
      ))}
    </div>
  );
};

export default Room;
