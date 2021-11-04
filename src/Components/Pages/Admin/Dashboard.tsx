import React, { useState, useMemo } from 'react';
import { useGetDatasQuery } from '../../../generated/graphql';
import Pagination from '../../../utils/Pagination';
import '../../../Styles/./styles.css';

let PageSize = 10;

interface location {
  latitude : number,
  longitude : number,
  location : string
}

interface Props{
  password : string
}
export default function Dashboard(props : Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const {data , error , loading , refetch} = useGetDatasQuery({variables:{
    Password : props.password,
  }})

   const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data?.getDatas.datas.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  
  if(!data) return(<div>Loading........</div>)
  

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
          {currentTableData?.map((item,index) : any => {
            let location ;
           if(item.location){
            location = JSON.parse(item.location);
           }
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.depth}</td>
                <td><a href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`} target="_blank">Check Location</a>
              </td>
                <td><img src={item.image} height={"250px"} width={"400px"}/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data?.getDatas.datas?.length}
        pageSize={PageSize}
        onPageChange={(page : any) => setCurrentPage(page)}
      />
    </>
  );
}