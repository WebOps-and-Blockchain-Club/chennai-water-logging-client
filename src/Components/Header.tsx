import React from "react";
import Logo from "../assests/logo.png";
import CFILogo from "../assests/cfi.png";

function Header() {
  return (
    <div>
      <div
        className="heading"
        style={{
          fontSize: "25px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src={Logo} height={"40px"} style={{ paddingRight: "10px" }} />
        CHENNAI WATER LOGGING
        <img src={CFILogo} height={"30px"} style={{ paddingLeft: "10px" }} />
      </div>
      <div style={{ textAlign: "center", padding: "0 10px 10px" }}>
        An initiative by IIT Madras to create a real-time flood map that can
        help us recommend remedies to civic bodies.
      </div>
    </div>
  );
}

export default Header;
