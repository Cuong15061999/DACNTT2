import React from 'react'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
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

const rows = [
  { id: 1, picture: "https://assets.materialup.com/uploads/bebad102-7f40-4941-99cd-54366113003e/avatar-08.png", title: 'Jon', url: 35 , dateTime: '11/12/2022'},
  { id: 2, picture: 'Lanqater', title: 'Cersei', url: 42 , dateTime: '12/12/2022'},
  { id: 3, picture: 'Lannister', title: 'Jaime', url: 45 , dateTime: '11/12/2022'},
  { id: 4, picture: 'Stark', title: 'Arya', url: 16 , dateTime: '11/12/2022'},
  { id: 5, picture: 'Targaryen', title: 'Daenerys', url: 113 , dateTime: '11/12/2022'},
  { id: 6, picture: 'Melisandre', title: 'Cuong', url: 150 , dateTime: '11/12/2022'},
  { id: 7, picture: 'Clifford', title: 'Ferrara', url: 44 , dateTime: '11/12/2022'},
  { id: 8, picture: 'Frances', title: 'Rossini', url: 36 , dateTime: '11/12/2022'},
  { id: 9, picture: 'Roxie', title: 'Harvey', url: 65 , dateTime: '11/12/2022'},
];

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

