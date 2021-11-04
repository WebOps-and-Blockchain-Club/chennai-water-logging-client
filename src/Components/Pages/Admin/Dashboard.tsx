import React, { useState, useMemo } from 'react';
import { useGetDatasQuery } from '../../../generated/graphql';
import '../../../Styles/styles.css';

let PageSize = 1;

interface Props{
  password : string
}
export default function Dashboard(props : Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const {data,error,loading} = useGetDatasQuery({variables:{
    Password : props.password,
    skip :(currentPage - 1)*1 ,
    limit : 1
  }})
  if(!data || loading) return(<div>Loading........</div>)
  const pageCount = Math.ceil(data?.getDatas.count!/PageSize);
  const pages = Array(pageCount).fill(1).map((x, y) => x + y)

  const handleClick=(index : number)=>{
    setCurrentPage(index)
  }


  return (
    <>
      <table className='admin-displayData-div'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Depth</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {data?.getDatas.datas.map((item,index) : any => {
            let location ;
           if(item.location){
            location = JSON.parse(item.location);
           }
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.depth}</td>
                <td><a href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`} target="_blank" rel='noreferrer'>Check Location</a>
              </td>
                <td><img src={item.image} height={"250px"} width={"400px"} className='center' alt=""/></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
      <a href="#" onClick={()=>{
        if(currentPage > 1){
          setCurrentPage(prev => prev-1)
        }
      }} className='arrow'>&laquo;</a>
      {
        pages.map(number => {
          return(
            <a href="#" onClick={(e)=>{handleClick(number)}}>{number}</a>
          )
        })
      }
      <a href="#" className='arrow' onClick={()=>{
        if(currentPage < data.getDatas.count){
          setCurrentPage(prev => prev+1)
        }}} >&raquo;</a>
    </div>

    </>
  );
}