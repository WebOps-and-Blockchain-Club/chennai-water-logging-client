import React from "react";

function Footer() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      Developed by{" "}
      <a
        href={`https://cfi.iitm.ac.in`}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", color: "black" }}
      >
        CFI
      </a>
      , IIT Madras &copy; All Rights Reserved
    </div>
  );
}

export default Footer;
