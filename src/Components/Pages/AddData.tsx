import React from "react";
import { useAddDataMutation } from "../../generated/graphql";
import "../../Styles/addData.css";
import Img from '../../assests/image.jpg';

interface Probs {}

export const AddData = (probs: Probs) => {
  const [filelist , setFilelist] = React.useState();
  const [location , setLocation] = React.useState<any >();
  const [error , setError] = React.useState('')
  const [depth , setDepth] = React.useState<string>("0")
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

      }, (err) => setError(err.message));
    }
  
  }

  const [addData] = useAddDataMutation();
  
  const handleSubmit = (e : any) =>{
    e.preventDefault();
    if(!location){
      setError("Geo location is not entered . Click on the Get location Button")
      return
    }
   
    addData({
      variables : {
        location : JSON.stringify(location),
        image : filelist,
        depth 
      }
    }).then(res =>  { if(res.data?.addData) setId(res.data?.addData!)})
    .catch(err => setError(err.message))
    setError("")
  }

  const copyLink = (e : any) =>{

    e.preventDefault()
    navigator.clipboard.writeText(`${window.location.href}data/${id}`)

  }
        return(
          <form onSubmit={handleSubmit}>
            <h3 className="heading">FLOOD DATA COLLECTION</h3>
            {
              error ? <div className="alert">
               
              {error}
            </div> : null
            }
          <label>Geo Location</label>
          <div style={{'width' : '100%'}}>
          <label style={{'float' : 'left','marginBottom' : '5px','padding' : '5px'}}>{location ? 
           <a href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`} target="_blank" rel="noreferrer">Check Location</a> : null}</label>
          
          <button onClick={getGeolocation} className="locationButton">Get location</button>  
          </div>
         <label>Flood depth</label>
          <div className="rangeDiv">
          <img src={Img} width={'200px'} height={'400px'} style={{'marginTop':'10%'}}/>
          <input type={'range'} min="0" max="10" step={'any'} value={depth} onChange={(e : any)=> setDepth(e.target.value)}/>
          </div>
          <output className="rangeLabel">{Number(Number(depth)*180/10).toFixed(1)}cm</output>
          
          <label>Image to support the request</label>
          <input className='forminput' type="file" accept="image/*" capture="environment" onChange={handleImageUpload} required/>
          <button type="submit" className="submitButton">Submit</button>
          <label>{ id ? "To view your submission visit this link": null} </label>
          {
            id? <div style={{'width':'100%'}}><a href={`/data/${id}`} >Click Here</a>
            <button onClick={copyLink} className="locationButton">Copy link</button></div> : null
          }
          </form>
        )
};
