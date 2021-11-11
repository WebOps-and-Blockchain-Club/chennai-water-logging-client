import React from "react";
import { useAddDataMutation } from "../../generated/graphql";
import "../../Styles/addData.css";
import Img from "../../assests/image.jpg";

interface Probs {}

export const AddData = (probs: Probs) => {
  const [filelist, setFilelist] = React.useState();
  const [location, setLocation] = React.useState<any>();
  const [error, setError] = React.useState("");
  const [depth, setDepth] = React.useState<string>("0");

  const handleImageUpload = (e: any) => {
    console.log(e.target.files[0]);
    setFilelist(e.target.files[0]);
  };

  const getGeolocation = (e: any) => {
    e.preventDefault();
    let coords = {
      latitude: 0,
      longitude: 0,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          coords.latitude = res.coords.latitude;
          coords.longitude = res.coords.longitude;
          setLocation(coords);
        },
        (err) => setError(err.message)
      );
    }
  };

  const [addData, { data, loading, error: addDataError }] =
    useAddDataMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!location) {
      window.alert(
        "Geo location is not entered . Click on the Get location Button"
      );
      return;
    }
    if (depth === "0") {
      window.alert(
        "Depth is not entered . Slide the slider to fix flood depth"
      );
      return;
    }
    try {
      addData({
        variables: {
          location: JSON.stringify(location),
          image: filelist,
          depth:
            Number((Number(depth) * 180) / 10)
              .toFixed(1)
              .toString() + " cm",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const copyLink = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText(
      `${window.location.href}data/${data?.addData}`
    );
  };

  if (data?.addData) {
    return (
      <div className="main-div">
        <div className="submission-box">
          <div className="sub-heading">
            To view your submission visit or copy this link{" "}
          </div>
          <div className="form-row">
            <a href={`/data/${data?.addData}`}>Click Here</a>
            <button onClick={copyLink} className="locationButton">
              Copy link
            </button>
          </div>
        </div>
      </div>
    );
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

  if (addDataError) {
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
      <form onSubmit={handleSubmit} className="add-data">
        <div className="heading" style={{ fontSize: "35px" }}>
          CHENNAI WATER LOGGING
        </div>
        <div className="sub-heading">Fill the details here</div>
        {error && <div className="error">{error}</div>}
        <div className="form-row">
          <div>Geo Location</div>
          {location && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              Check Location
            </a>
          )}
        </div>
        <button onClick={getGeolocation} className="locationButton">
          Get location
        </button>
        <div className="form-row">
          <div>Flood depth</div>
          <div style={{ fontWeight: "bold" }}>
            {Number((Number(depth) * 180) / 10).toFixed(1)}cm
          </div>
        </div>
        <div>
          <img src={Img} alt={"person"} width={"200px"} height={"300px"} />
          <input
            type={"range"}
            min="0"
            max="10"
            step={"any"}
            value={depth}
            onChange={(e: any) => setDepth(e.target.value)}
            required
          />
        </div>
        <div>Image to support the request</div>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          required
        />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
      <div className="add-data" style={{ marginBottom: "25px" }}>
        <div className="heading" style={{ fontSize: "35px" }}>
          ABOUT US
        </div>
        <div>
          This platform enables users / public to report details such as flood
          location and water depth, as well as add photos of flood sites with a
          description across the Chennai region as frequently as possible. All
          reports are gathered onto a real-time flood map. The data gathered
          through this platform aims to improve disaster preparedness and
          response in communities by gathering, sorting, and presenting data of
          flooding reports.
        </div>
        <div>
          This Crowd source data, curated through this platform will help to
          understand the reasons for waterlogging / inundation and help IIT
          Madras researchers to develop / design remedial measures that may be
          recommended to GCC, PWD and other relevant Govt. departments for their
          action.
        </div>
      </div>
    </div>
  );
};
