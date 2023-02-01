import React from 'react'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { blue, yellow, red }from "@mui/material/colors"
import { UserTableData } from '../../Data/UserTableData/Data';
const columns = [
  { 
    field: 'avatar', 
    headerName: 'Avatar', 
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
  { field: 'username', headerName: 'Username', flex: 3 },
  { field: 'password', headerName: 'Password', flex: 3 },
  { field: 'email', headerName: 'Email', flex: 3 },
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

const rows = UserTableData;

export const UserTable = () => {
  return (
    <div className='Table' style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}

