import React, {useEffect, useState} from 'react';
import  '../../../styles/App.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getUser } from '../../../Utils/Common';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let Types = {};
const columns  = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'value', headerName: 'Value', width: 130 },
];

function MyAsset() {
    const user = getUser();
    const [Query, setQuery] = useState('');
    const [open, setOpen] = React.useState(false);
    const [Name, setName] = useState('');
    const [rows,setrows] = useState([]);
    const [Description, setDescription] = useState('');
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);


    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const handleClick2 = () => {
        setOpen2(true);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const StartFunc = async () =>{
        try{
            await axios.get('http://localhost:4000/asset/gettypes')
                .then(res => {
                    const data = res.data;
                    for (const i in data){
                        Types[data[i]._id]=data[i].type;


                    }
                    console.log(Types)

                }
            );

            await axios.get('http://localhost:4000/asset/searchbyEmp/' + user._id)
                .then(res => {
                        const data = res.data;
                        for (let k in data){
                            const row ={
                                id:data[k]._id,
                                name:data[k].name,
                                description:data[k].description,
                                type:Types[`${data[k].type}`],
                                status:data[k].status,
                                value:data[k].value
                            }
                            setrows(rows => [...rows, row]);
                        }
                    }
            );

        }catch (e) {
            console.log(e)
        }
    }


    useEffect(() => StartFunc(),[]);
    return (
        <div>
            <div style={{ height: 700, width: 900, margin: '1% 3% 2% 4%', background:'#cecece6b'}}>
                <Stack spacing={2} sx={{ m: 4,mx: "auto" }}>
                <h2>MY ASSETS</h2>

                <div style={{ height: 400, width: 750, margin:"auto", background:'#EEEEEE'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
                </Stack>
            </div>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Asset Type Added successfuly!
                    </Alert>
                </Snackbar>
            </Stack>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                    <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
                        Please Fill Everything!
                    </Alert>
                </Snackbar>
            </Stack>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                    <Alert onClose={handleClose2} severity="warning" sx={{ width: '100%' }}>
                        Something went wrong, Please try again!
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}

export default MyAsset