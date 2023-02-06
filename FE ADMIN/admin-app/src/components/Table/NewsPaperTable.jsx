import React, { useEffect } from 'react'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { blue, yellow, red } from "@mui/material/colors"
import axios from 'axios';
import { useState } from 'react';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

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
  { field: 'domain_name', headerName: 'Domain', flex: 2 },
  { field: 'rss_url', headerName: 'Rss_url', flex: 3 },
  { field: 'crawl_process', headerName: 'Process', flex: 1 },
  { field: 'type', headerName: 'Type', flex: 1 },
  {
    field: 'last_date_crawl',
    headerName: 'Crawl Time',
    flex: 1.5,
    renderCell: (params) => {
      return (
        <>
          {moment(params.value).format('DD-MM-YYYY, h:mm')}
        </>
      );
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
        navigate('/NewspaperDetail/' + id);
      };
      const LoadEdit = (id) => {
        navigate('/NewspaperEdit/' + id);
      };
      const RemoveFunction = (id) => {
        if (window.confirm('Do you want to delete this newspaper ?')) {
          axios.delete('http://localhost:3001/newspaper/' + id)
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

export const NewsPaperTable = () => {
  const [newspaperData, setNewspaperData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/newspaper')
      .then((res) => {
        console.log(res.data.data)
        setNewspaperData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
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

