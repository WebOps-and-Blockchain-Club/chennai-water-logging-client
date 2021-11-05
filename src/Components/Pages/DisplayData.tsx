import React from "react";
import { useParams } from "react-router-dom";
import { useGetDataByIdQuery } from "../../generated/graphql";
import "../../Styles/displayData.css"

interface Probs {}

export const DisplayData = (probs: Probs) => {
  const {id} = useParams<any>();
  const {data,error , loading} = useGetDataByIdQuery({variables:{
    ID : id
  }})
  let location;
 if(data) {location = JSON.parse(data?.getDataByID?.location!);}
 
  if(!data) return(<div>Loading........</div>)
  return(
    <div className="displayData-div">
      <div className="displaydata-heading">Your Submission</div>
      <table className="styled-table">
      <tbody>
          <tr>
              <td>Location </td>
              <td><a href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`} target="_blank" rel="noreferrer">Check Location</a>
         </td>
          </tr>
          <tr>
              <td>Flood Depth</td>
              <td>{data?.getDataByID.depth} cm</td>
          </tr>
          <tr>
              <td>Image Uploaded</td>
              <td><img src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.getDataByID.image}`} height={'250px'} width={'400px'} alt=""/></td>
          </tr>
      </tbody>
  </table> 

    </div>
  );
};
