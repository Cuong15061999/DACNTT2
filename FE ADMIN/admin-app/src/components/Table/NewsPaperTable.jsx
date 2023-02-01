import React, { useEffect } from 'react'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { blue, yellow, red }from "@mui/material/colors"
import { NewsPaperTableData } from '../../Data/NewsPaperTableData/Data';
import axios from 'axios';
import { useState } from 'react';
const columns = [
  { 
    field: 'logo', 
    headerName: 'Logo', 
    flex: 1,
    renderCell: (params) => {
      // console.log(params);
      return (
        <>
          <img src={params.value} width={100} />
        </>
      );
    }
  },
  { field: 'domain_name', headerName: 'Domain', flex: 3 },
  { field: 'rss_url', headerName: 'Rss_url', flex: 3 },
  { field: 'crawl_process', headerName: 'Process', flex: 1 },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};
        console.log(params.row._id)
        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return (<div >
        <InfoIcon sx={{ color: blue[900] }} onClick={onClick}></InfoIcon> 
        <EditIcon sx={{ color: yellow[900] }} onClick={onClick}></EditIcon>
        <DeleteForeverIcon sx={{ color: red[900] }} onClick={onClick}></DeleteForeverIcon>
      </div>)
    }, 
  },
];

export const NewsPaperTable = () => {
  const[newspaperData, setNewspaperData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/newspaper')
    .then( (res) => {
      setNewspaperData(res.data.data)
    })
    .catch( (err) => {
      console.log(err)
    })
  },[])
  return (
    <div className='Table' style={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={newspaperData.map((item, index) => ({ id: index + 1, ...item }))}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}

