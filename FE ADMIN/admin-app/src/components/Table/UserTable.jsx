import React from 'react'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { blue, yellow, red }from "@mui/material/colors"
import { UserTableData } from '../../Data/UserTableData/Data';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
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
  { field: 'username', headerName: 'Username', flex: 1 },
  { field: 'password', headerName: 'Password', flex: 2 },
  { field: 'email', headerName: 'Email', flex: 2 },
  { field: 'tag_favorite', headerName: 'Tag favorite', flex: 3 },
  { field: 'created', headerName: 'created', flex: 1 ,
    renderCell: (params) => {
      return(
        <>
          {moment(params.value).format('DD-MM-YYYY')}
        </>
      )
    }
  },
  
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      const navigate = useNavigate();
      const LoadDetail = (id) => {
        navigate('/UserDetail/' + id);
      };
      const LoadEdit = (id) => {
        navigate('/UserEdit/' + id);
      };
      const RemoveFunction = (id) => {
        if (window.confirm('Do you want to delete this user ?')) {
          axios.delete('http://localhost:3001/users/' + id)
            .then((res) => {
              console.log(res.data)
              alert('Remove Successfully')
              window.location.reload();
            })
            .catch((err) => {
              console.log(err)
            })
        }
      };

      return (<div >
        <InfoIcon sx={{ color: blue[900] }} onClick={() => { LoadDetail(params.row._id) }}></InfoIcon>
        <EditIcon sx={{ color: yellow[900] }} onClick={() => { LoadEdit(params.row._id) }}></EditIcon>
        <DeleteForeverIcon sx={{ color: red[900] }} onClick={() => { RemoveFunction(params.row._id) }}></DeleteForeverIcon>
      </div>)
    }, 
  },
];


const rows = UserTableData;

export const UserTable = () => {
  const [usersData, setUserData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then((res) => {
        console.log(res.data.data)
        setUserData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className='Table' style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={usersData.map((item, index) => ({ id: index + 1, ...item }))}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}

