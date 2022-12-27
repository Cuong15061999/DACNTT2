import React from 'react'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import { MainDashTableData } from '../../Data/MainDashTableData/Data';
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
  { field: 'dateTime', headerName: 'DateTime', flex: 1},
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

      return <Button onClick={onClick}>Details</Button>;
    },
  },
];

const rows = MainDashTableData;

export const Table = () => {
  return (
    <div className='Table' style={{ height: 400, width: '100%' }}>
      <h3> Hot News</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

