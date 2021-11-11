import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetDataByIdQuery } from "../../generated/graphql";
import "../../Styles/displayData.css";

interface Probs {}

export const DisplayData = (probs: Probs) => {
  const { id } = useParams<any>();
  const { data, loading, error } = useGetDataByIdQuery({
    variables: {
      ID: id,
    },
  });

  let location;
  if (data) {
    location = JSON.parse(data?.getDataByID?.location!);
  }

  if (loading) {
    return (
      <div className="main-div">
        <div className="submission-box">
          <div className="sub-heading">Loading... </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-div">
        <div className="submission-box" style={{ backgroundColor: "#f44336" }}>
          <div className="sub-heading">Some error occured!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-div">
      <div className="add-data">
        <div className="heading" style={{ fontSize: "35px" }}>
          Your Data
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
          target="_blank"
          rel="noreferrer"
          style={{ borderBottom: "none" }}
        >
          Location
        </a>
        <div> Flood Depth : {data?.getDataByID.depth}</div>
        <div>
          {" "}
          Data added on :{" "}
          {moment(parseInt(data?.getDataByID.time!)).format(
            "MMMM Do YYYY, h:mm a"
          )}
        </div>
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/images/${data?.getDataByID.image}`}
          width={"80%"}
          alt=""
        />
      </div>
    </div>
  );
};
