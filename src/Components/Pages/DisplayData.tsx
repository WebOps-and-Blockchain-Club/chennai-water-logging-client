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
      <div className="displaydata-heading">Your Data</div>
      
            <div className="Datadiv">
            <div className="location-div">
            <a className={"button2"}href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`} target="_blank" rel="noreferrer">Location</a>
            </div>
        
             <div className="depth-div">
             <span className="button2"> Flood Depth  : {Number(Number(data.getDataByID.depth)*180/10).toFixed(2)} cm
            </span>
              </div>
             </div>
        
             <div className="img-div">
              <img src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.getDataByID.image}`} height={'250px'} width={'100%'} alt=""/>
         
             </div>
        

    </div>
  );
};
