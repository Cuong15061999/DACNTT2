import React, { useEffect, useState } from 'react'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { NewsTableData } from '../../Data/NewsTableData/Data';
import { blue, yellow, red }from "@mui/material/colors";
import axios from 'axios';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

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
  { field: 'title', headerName: 'Title', flex: 3 },
  { field: 'url', headerName: 'URL', flex: 2 },
  { field: 'domain', headerName: 'Domain', flex: 1 },
  { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'date', 
    headerName: 'Date', 
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          {moment(params.value).format('DD-MM-YYYY, h:mm a')}
        </>
      )
    }
  },
  {
    field: 'action',
    headerName: '',
    sortable: false,
    renderCell: (params) => {
      const navigate = useNavigate();
      const LoadDetail = (id) => {
        navigate('/NewsDetail/' + id);
      };
      const LoadEdit = (id) => {
        navigate('/NewsEdit/' + id);
      };
      const RemoveFunction = (id) => {
        if (window.confirm('Do you want to delete this newspaper ?')) {
          axios.delete('http://localhost:3001/news/' + id)
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

      return (<div>
        <InfoIcon sx={{ color: blue[900] }} onClick={() => { LoadDetail(params.row._id) }}></InfoIcon>
        <EditIcon sx={{ color: yellow[900] }} onClick={() => { LoadEdit(params.row._id) }}></EditIcon>
        <DeleteForeverIcon sx={{ color: red[900] }} onClick={() => { RemoveFunction(params.row._id) }}></DeleteForeverIcon>
      </div>)
    }, 
  },
];

const rows = NewsTableData;

export const NewsTable = () => {
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/news')
      .then((res) => {
        console.log(res.data.data)
        setNewsData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className='Table' style={{ height: 650, width: '100%' }}>
      <DataGrid
      initialState={{
        sorting: {
          sortModel: [{ field: 'date', sort: 'desc' }],
        },
      }}
        rows={newsData.map((item, index) => ({ id: index + 1, ...item }))}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}

