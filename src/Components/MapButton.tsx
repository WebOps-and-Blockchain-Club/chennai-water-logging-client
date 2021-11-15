import React from "react";
import { useHistory } from "react-router";

const MapButton = () => {
  const history = useHistory();
  const handleClick = () => history.push("/view");
  return (
    <div style={{ position: "fixed", bottom: "50px", right: "20px" }}>
      <button
        onClick={handleClick}
        style={{
          borderRadius: "50%",
          padding: "20px",
        }}
      >
        &#x1F327;
      </button>
    </div>
  );
};

export default MapButton;
