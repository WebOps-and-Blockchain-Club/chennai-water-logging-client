import React from "react";
import "../../Styles/addData.css"

interface Probs {}

export const AddData = (probs: Probs) => {
  const [filelist , setFilelist] = React.useState();
  const [latitude , setLatitude] = React.useState(0);
  const [longitude , setLongitude] = React.useState(0);
 
  const [error , setError] = React.useState<any>()
  const handleImageUpload = ( e : any) =>{
      setFilelist(e.target.files[0])
  }

  const getGeolocation = (e : any)=>{
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(navigator)
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      },err => setError(err.message));
    }else{
      setLatitude(100000)
    }
  }
 
        return(
          <form >
        <label>Geo Location</label>
        <button onClick={getGeolocation}>Get location</button>
        <label>Latitude : {latitude}  Longitude : {longitude}</label>
        <label>{error}</label>
        <label>Flood depth</label>
        <input name="address" />
        <label>Image to support the request</label>
        <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload}/>
        {/* <label>{filelist}</label> */}
        <button type="submit" className="submitButton">Submit</button>
      </form>
        )
};
