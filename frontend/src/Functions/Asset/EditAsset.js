import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import  './../../styles/App.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import EditIcon from '@mui/icons-material/Edit';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditAsset() {
    const [open, setOpen] = React.useState(false);
    const [Name, setName] = useState('');
    const [Selection, setSelection] = useState('');
    const [status, setStatus] = useState('');
    const [Description, setDescription] = useState('');
    const [Value,setValue] = useState('');
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [repo,setRepo] = useState([]);
    const [Defstatus] = useState([{'name':'Working'}, {'name':'Repair Need'}]);
    const [disable, setdisable] = useState('true');



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

    function onSubmit(event) {
        event.preventDefault();
        if (Name.length === 0 || Value.length===0 || Description.length === 0){
            handleClick1();
        }else{

            try{

                if(window.confirm("Are you sure want to update?")===true){


                const taskOBJ = {
                    name: Name,
                    description: Description,
                    status: status,
                    value: Value
                };
                axios.put(`http://localhost:4000/asset/update-asset/${Selection}`, taskOBJ)
                    .then(res => console.log(res.data));
                setName('');
                setDescription('');
                setValue('');
                setStatus('');
                handleClick();
                //window.location.reload();

            }else{

            }
            }
            catch(err){
                handleClick2();
            }

        }

    }

    const handleSelection = async (event) => {
       console.log( event.target.value);
       setSelection(event.target.value);
        try{
            await axios.get(`http://localhost:4000/asset/get-asset/${event.target.value}`)
                .then(response => {
                    // console.log(JSON.stringify(response.data));
                    const myRepo = response.data;
                    setName(myRepo.name);
                    setDescription(myRepo.description);
                    setStatus(myRepo.status);
                    setValue(myRepo.value);
                    setdisable(false);
                });
        }catch (e) {
            await handleClick2();
        }


    }

    const getRepo = async () => {
        try{
            setRepo([]);
            await axios.get('http://localhost:4000/asset/')
                .then(response => {
                    // console.log(JSON.stringify(response.data));
                    const myRepo = response.data;
                    setRepo(myRepo);
                });
        }catch (e) {
            await handleClick2();
        }

    };

    useEffect(() => getRepo(),[]);
    return (
        <div>
            <div className="prof">
                <h2>Edit Assets</h2>

                <form onSubmit={onSubmit}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">Select Asset</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Job"
                            
                            onChange={event => handleSelection(event)}
                        >
                            <MenuItem value="Def" disabled selected="true">Select Type</MenuItem>
                            { repo.map((repos) => (
                                <MenuItem value={repos._id} name={repos.name} >{repos.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br></br><br></br>

                    <TextField disabled={disable} id="standard-uncontrolled" label="Name" defaultValue="" value={Name} onChange={e => setName(e.target.value)} /><br></br><br></br>

                    <TextField
                        disabled={disable}
                        id="standard-uncontrolled"
                        label="Description"
                        defaultValue=""
                        multiline Rows={4}
                        style = {{width: "73%"}}
                        value={Description}
                        onChange={e => setDescription((e.target.value))}
                    />
                    <br></br><br></br>

                    <TextField disabled={disable} id="standard-uncontrolled" label="Value" defaultValue="" value={Value} onChange={e => setValue(e.target.value)} /><br></br><br></br>

                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            disabled={disable}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Select Job"
                            onChange={e => setStatus(e.target.value)}
                        >
                            <MenuItem value="Def" disabled selected="true">Select Status</MenuItem>
                            { Defstatus.map((repos) => (
                                <MenuItem value={repos.name} name={repos.name} >{repos.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br></br><br></br>
                    
                    <Button disabled={disable} variant="contained" color="primary"  type="submit" startIcon={<EditIcon/>}>
                        Update Asset
                    </Button></form><br></br><br></br>
            </div>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Asset Updated successfuly!
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

export default EditAsset