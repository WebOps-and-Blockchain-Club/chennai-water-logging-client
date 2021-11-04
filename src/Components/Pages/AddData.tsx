import React from "react";
import { useAddDataMutation } from "../../generated/graphql";
import "../../Styles/addData.css";

interface Probs {}

export const AddData = (probs: Probs) => {
  const [filelist , setFilelist] = React.useState();
  const [location , setLocation] = React.useState<any >();
 
  const [depth , setDepth] = React.useState<string>("")
  const [id , setId] = React.useState("");

  const handleImageUpload = ( e : any) =>{
      console.log(e.target.files[0])
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
    }
  
  }

  const [addData] = useAddDataMutation();
  
  const handleSubmit = (e : any) =>{
    console.log("depth",depth , location)
    e.preventDefault();
    addData({
      variables : {
        location : JSON.stringify(location),
        image : filelist,
        depth 
      }
    }).then(res =>  { if(res.data?.addData) setId(res.data?.addData!)})
    
  }
        return(
          <form onSubmit={handleSubmit}>
          <label>Geo Location</label>
          <button onClick={getGeolocation} className="locationButton">Get location</button>  
          <label>{location ? 
           <a href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`} target="_blank">Check Location</a> : null}</label>
          <label>Flood depth</label>
          <select id="depth" onChange={(e : any)=> setDepth(e.target.value)}>
            <option value="0-5">0-5 cm</option>
            <option value="5-10">5 -10 cm</option>
            <option value="10-15">10-15 cm</option>
            <option value="15">15+ cm</option>
          </select>
          <label>Image to support the request</label>
          <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload}/>
          <button type="submit" className="submitButton">Submit</button>
          <label>{ id ? "To view your submission visit this link": null} </label>
          {
            id? <a href={`/data/${id}`}>{`${window.location.href}data/${id}`}</a> : null
          }
          </form>
        )
};
