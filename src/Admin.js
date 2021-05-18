// import { usePagination } from '@material-ui/lab/Pagination';
import Pagination from 'react-bootstrap/Pagination'
import Cake from './Cake';
import {useEffect, useState} from "react"
import axios from "axios"
import cakes from './data';
import {MDBDataTable} from 'mdbreact'

function Admin(){
 
    let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number + "dfsvdfsndfsdn"}
    </Pagination.Item>,
  );
}

const paginationBasic = (
  <div>
    <Pagination>{items}</Pagination>
    <br />

    <Pagination size="lg">{items}</Pagination>
    <br />

    <Pagination size="sm">{items}</Pagination>
  </div>
);

  var data={
    columns:[{
      label:'CakeId',
      field:'cakeid',
      sort:'asc',
      width:270
    },{
      label:'Name',
      field:'name',
      sort:'asc',
      width:270
    },{
      label:'Price',
      field:'price',
      sort:'asc',
      width:270
    }],
    rows: cakes
  }

    return(
        // paginationBasic

        <div>
            {data && <MDBDataTable bordered small data={data} />}
        </div>
    )
}

export default Admin
