import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import  './../../styles/App.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { getUser } from './../../Utils/Common';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
let Types = {};

function AssignAsset() {
    const user = getUser();
    const [open, setOpen] = React.useState(false);
    const [Asset, setAsset] = useState([]);
    const [Employee, setEmployee] = useState([]);
    const [SelectedAsset, setSelectedAsset] = useState('');
    const [SelectedEmployee, setSelectedEmployee] = useState('');
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

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

    async function onSubmit(event) {
        event.preventDefault();
        if(window.confirm("Are you sure want to update?")===true){
            try{
                const updateObj ={
                    employee:SelectedEmployee._id
                }
                await axios.put(`http://localhost:4000/asset/update-asset/${SelectedAsset.id}`, updateObj)
                    .then(response => {
                        console.log(response);
                        handleClick();
                    });
            }catch (e) {
                console.log(e)
                handleClick2();
            }
        }

  
    }
    const getRepo = async() => {
        await axios.get('http://localhost:4000/asset/gettypes')
            .then(res => {
                    const data = res.data;
                    for (const i in data){
                        Types[data[i]._id]=data[i].type;


                    }
                    console.log(Types)

                }
            );
        await axios.get(`http://localhost:4000/asset`)
            .then(response => {
                const data = response.data;
                for (let k in data){
                    const row ={
                        id:data[k]._id,
                        name:data[k].name,
                        description:data[k].description,
                        type:Types[`${data[k].type}`],
                        status:data[k].status,
                        value:data[k].value
                    }
                    setAsset(Asset => [...Asset, row]);
                }

        });
        await axios.get('http://localhost:4000/users')
            .then(response => {
                const myRepo = response.data;
                setEmployee(myRepo);
            });
    };
    useEffect(() => getRepo(),[]);
    return (
        <div>
            <div className="prof">
                <Stack spacing={2} sx={{ m: 4,mx: "auto" }}>
                    <h2>ASSIGN ASSET</h2>
                    <form onSubmit={onSubmit}>
                        <Autocomplete
                            onChange={(event, value) => setSelectedAsset(value)}
                            values={SelectedAsset}
                            id="tags-standard"
                            limitTags={1}
                            size="small"
                            options={Asset}
                            getOptionLabel={(option) => (option.name + ' : ' + option.type)}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    {...params}
                                    style={{ width: 350 }}
                                    variant="standard"
                                    label="Select Asset"
                                    placeholder="Assets"
                                />
                            )}
                        />
                        <Autocomplete
                            onChange={(event, value) => setSelectedEmployee(value)}
                            values={SelectedEmployee}
                            id="tags-standard"
                            limitTags={1}
                            size="small"
                            options={Employee}
                            getOptionLabel={(option) => option.username}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    {...params}
                                    style={{ width: 350 }}
                                    variant="standard"
                                    label="Select Employee"
                                    placeholder="Employees"
                                />
                            )}
                        /><br></br>
                        <Button variant="contained" color="primary" type="submit" startIcon={<PersonAddAlt1Icon/>}>
                            Assign Asset
                        </Button>
                    </form>
                </Stack>
            </div>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Assigned successfuly!
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

export default AssignAsset