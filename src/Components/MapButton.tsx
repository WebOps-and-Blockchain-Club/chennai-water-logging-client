import React from "react";
import { useHistory } from "react-router";

const MapButton = () => {
  const history = useHistory();
  const handleClick = () => history.push("/view");
  return (
    <button
      onClick={handleClick}
      style={{
        borderRadius: "10px",
        backgroundColor: "#5ca1e1",
        border: "none",
        color: "#fff",
        textAlign: "center",
        padding: "8px 16px",
        margin: "25px auto 0",
        cursor: "pointer",
      }}
    >
      View on Map
    </button>
  );
};

export default MapButton;
