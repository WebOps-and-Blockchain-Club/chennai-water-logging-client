import React from "react";
import "../../Styles/addData.css";

interface Probs {}

export const AddData = (probs: Probs) => {
  const [filelist , setFilelist] = React.useState();
  const [location , setLocation] = React.useState<any >();
 
  const [error , setError] = React.useState<any>()

  const handleImageUpload = ( e : any) =>{
      setFilelist(e.target.files[0])
  }


  const getGeolocation = (e : any)=>{
    e.preventDefault();
    let coords = {
      latitude : 0 ,
      longitude : 0 ,
      location : " "
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res)=>{
        coords.latitude = res.coords.latitude;
        coords.longitude = res.coords.longitude;
        coords.location = "Location";
        setLocation(coords)

      });
    } else {
      // x.innerHTML = "Geolocation is not supported by this browser.";
    }
  
  }
  
        return(
          <form >
          <label>Geo Location</label>
          <button onClick={getGeolocation} className="locationButton">Get location</button>  
          <label>{location ? 
           <a href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`} target="_blank">Check Location</a> : null}</label>
          <label>Flood depth</label>
          <select id="depth">
            <option value="0-5">0-5 cm</option>
            <option value="5-10">5 -10 cm</option>
            <option value="10-15">10-15 cm</option>
            <option value="15">15+ cm</option>
          </select>
          <label>Image to support the request</label>
          <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload}/>
          <button type="submit" className="submitButton">Submit</button>
          </form>
        )
};
