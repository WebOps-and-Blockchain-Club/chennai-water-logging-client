import React from "react";
import "../../Styles/displayData.css"

interface Probs {}

export const DisplayData = (probs: Probs) => {
  return(
    <div className="displayData-div">
      <div className="displaydata-heading">Your Submission</div>
      <table className="styled-table">
      <tbody>
          <tr>
              <td>Location </td>
              <td>............</td>
          </tr>
          <tr>
              <td>Flood Depth</td>
              <td>..............</td>
          </tr>
          <tr>
              <td>Image Uploaded</td>
              <td>............</td>
          </tr>
      </tbody>
  </table>

    </div>
  );
};
