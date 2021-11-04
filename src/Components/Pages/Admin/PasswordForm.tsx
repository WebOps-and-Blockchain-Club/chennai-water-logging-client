import React, { useState } from 'react'
import Dashboard from './Dashboard';

const PasswordForm = () =>{
    const [ password,setPassword] = useState("");
    const [getData , setGetData] = useState(false);
    return (
      <>
        <form>
        <label>Enter the Password</label>
        <input type = "password" value={password} onChange={(e : any)=>{setPassword(e.target.value)}}/>
        <button onClick={(e : any) => 
          {
            e.preventDefault();
            setGetData(true)
          }
          }>Get Data</button>
      </form>
      <div style={{"width" : "90%", "margin" : "20px"}}>
      {
       getData ? <Dashboard password={password} /> : null
      }
      </div>
      </>
    )
}

export default PasswordForm;
