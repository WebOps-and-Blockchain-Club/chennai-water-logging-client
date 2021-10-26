import React from "react";
import "../../Styles/addData.css"

interface Probs {}

export const AddData = (probs: Probs) => {
  const [filelist , setFilelist] = React.useState();
  const [latitude , setLatitude] = React.useState(0);
  const handleImageUpload = ( e : any) =>{
      setFilelist(e.target.files[0])
  }

  const getGeolocation = (e : any)=>{
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude)
        setLatitude(position.coords.latitude)
      });
    }
  }
  console.log(filelist)

        return(
          <form >
        <label>Geo Location</label>
        <button onClick={getGeolocation}>Get location</button>
        <label>{latitude}</label>
        <label>Flood depth</label>
        <input name="address" />
        <label>Image to support the request</label>
        <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload}/>
        {/* <label>{filelist}</label> */}
        <button type="submit" className="submitButton">Submit</button>
      </form>
        )
};
