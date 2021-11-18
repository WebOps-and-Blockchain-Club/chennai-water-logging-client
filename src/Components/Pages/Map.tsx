import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useGetDatasForMapQuery } from "../../generated/graphql";
import moment from "moment";
import "../../Styles/map.css";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY!;
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default function Mapp() {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map>();
  const lng = 80;
  const lat = 13.0678;
  const zoom = 8;

  const { data } = useGetDatasForMapQuery({
    variables: {
      Password: process.env.REACT_APP_SECRET!,
      timeLimit: 48,
    },
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    data?.getDatas.datas.forEach(
      (_data: {
        location: string;
        time: string;
        depth: string;
        image: string;
      }) => {
        let location = JSON.parse(_data.location!);
        console.log(location.latitude);
        new mapboxgl.Marker({ color: colorCode(_data.depth) })
          .setLngLat([Number(location.longitude), Number(location.latitude)])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<div
              style=display:flex;align-items:center;background-color:#dedede;width:max-content;padding:30px;border-radius:5px;
            >
              <img src=${process.env.REACT_APP_BACKEND_URL}/images/${
                _data.image
              } height=200px style=max-width:40vw;object-fit:cover; />
              <div style=padding-left:10px >
                Updated at <br /> ${moment(parseInt(_data.time)).format(
                  "MMMM Do YYYY, h:mm a"
                )}
                <br /> <br />Flood Depth<br />${_data.depth}
              </div>
            </div>`
            )
          )
          .addTo(map.current!);
      }
    );
  }, [data]);

  return (
    <div style={{ maxHeight: "calc(100vh - 150px)", overflow: "hidden" }}>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "100vh" }}
      />
    </div>
  );
}

const colorCode = (depth: string) => {
  const depthInt = Number(depth.split(" cm")[0]);

  if (depthInt < 5) return "#1AA9D0";
  else if (depthInt < 35) return "#2488D5";
  else if (depthInt < 75) return "#3669D5";
  else if (depthInt < 150) return "#2140A3";
  else if (depthInt < 180) return "#161F6F";

  return "invalid";
};
