import fileDownload from "js-file-download";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useGetDataInCsvQuery,
  useGetDatasQuery,
} from "../../../generated/graphql";
import "../../../Styles/styles.css";

let PageSize = 10;

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [password, setPassword] = useState("");
  React.useEffect(() => {
    if (localStorage.getItem("password")) {
      setPassword(localStorage.getItem("password")!);
    }
  }, []);
  const history = useHistory();
  const { data, loading } = useGetDatasQuery({
    variables: {
      Password: password,
      skip: (currentPage - 1) * 10,
      limit: 10,
    },
  });
  const { data: csvData } = useGetDataInCsvQuery({
    variables: {
      Password: password,
    },
  });

  if (!data || loading) return <div>Loading........</div>;
  const pageCount = Math.ceil(data?.getDatas.count! / PageSize);
  const pages = Array(pageCount)
    .fill(1)
    .map((x, y) => x + y);

  const handleClick = (index: number) => {
    setCurrentPage(index);
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <button
          style={{ float: "right", margin: "10px", padding: "5px" }}
          onClick={() => {
            localStorage.removeItem("password");
            history.replace("/dashboard");
          }}
        >
          Logout
        </button>
      </div>
      <button
        onClick={() => {
          fileDownload(csvData?.getDataInCSV!, `flood_data.csv`);
        }}
      >
        GET DATA
      </button>
      <table className="admin-displayData-div">
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Depth</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {data?.getDatas.datas.map((item, index): any => {
            let location;
            if (item.location) {
              location = JSON.parse(item.location);
            }
            return (
              <tr key={item.image}>
                <td>{index + 1}</td>
                <td>{item.depth}</td>
                <td>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Check Location
                  </a>
                </td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.image}`}
                    height={"250px"}
                    width={"400px"}
                    className="center"
                    alt=""
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <a
          href="#/"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((prev) => prev - 1);
            }
          }}
          className="arrow"
        >
          &laquo;
        </a>
        {pages.map((number) => {
          return (
            <a
              href="#/"
              onClick={(e) => {
                handleClick(number);
              }}
              key={number}
            >
              {number}
            </a>
          );
        })}
        <a
          href="#/"
          className="arrow"
          onClick={() => {
            if (currentPage < data.getDatas.count / 10) {
              setCurrentPage((prev) => prev + 1);
            }
          }}
        >
          &raquo;
        </a>
      </div>
    </>
  );
}
