import React from 'react'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { NewsTableData } from '../../Data/NewsTableData/Data';
import { blue, yellow, red }from "@mui/material/colors"
const columns = [
  { 
    field: 'picture', 
    headerName: 'Picture', 
    flex: 0.5,
    renderCell: (params) => {
      console.log(params);
      return (
        <>
          <Avatar src={params.value} variant="rounded"/>
        </>
      );
    }
  },
  { field: 'title', headerName: 'Title', flex: 2 },
  { field: 'url', headerName: 'URL', flex: 2 },
  { field: 'domain', headerName: 'Domain', flex: 2 },
  { field: 'date', headerName: 'Date', flex: 1},
  {
    field: 'action',
    headerName: '',
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return (<div>
        <InfoIcon sx={{ color: blue[900] }} onClick={onClick}></InfoIcon> 
        <EditIcon sx={{ color: yellow[900] }} onClick={onClick}></EditIcon>
        <DeleteForeverIcon sx={{ color: red[900] }} onClick={onClick}></DeleteForeverIcon>
      </div>)
    }, 
  },
];

const rows = NewsTableData;

export const NewsTable = () => {
  return (
    <div className='Table' style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}

