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
import { getUser } from './../../Utils/Common';
import AddIcon from '@mui/icons-material/Add';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddAsset() {
    const user = getUser();
    const [open, setOpen] = React.useState(false);
    const [Name, setName] = useState('');
    const [Type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [Description, setDescription] = useState('');
    const [Value,setValue] = useState('');
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [repo,setRepo] = useState([]);
    const [Defstatus] = useState([{'name':'Working'}, {'name':'Repair Need'}]);




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
                const taskOBJ = {
                    name: Name,
                    uid:user._id,
                    description: Description,
                    type:Type,
                    status: status,
                    value: Value
                };
                axios.post('http://localhost:4000/asset/create-asset', taskOBJ)
                    .then(res => console.log(res.data));
                setName('');
                setDescription('');
                setValue('');
                handleClick();
            }
            catch(err){
                handleClick2();
            }

        }

    }

    const getRepo = async () => {
        try{
            await axios.get('http://localhost:4000/asset/gettypes')
                .then(response => {
                    const myRepo = response.data;
                    setRepo(myRepo);
                });
        }catch (e) {
            handleClick2();
        }

    };

    useEffect(() => getRepo(),[]);
    return (
        <div>
            <div className="prof">
                <h2>Add Assets</h2>
                <form onSubmit={onSubmit}>
                    <TextField id="standard-uncontrolled" label="Name" defaultValue="" value={Name} onChange={e => setName(e.target.value)} /><br></br><br></br>

                    <TextField
                        id="standard-uncontrolled"
                        label="Description"
                        defaultValue=""
                        multiline Rows={4}
                        style = {{width: "73%"}}
                        value={Description}
                        onChange={e => setDescription((e.target.value))}
                    />
                    <br></br><br></br>

                    <TextField type="number" style = {{width: "73%"}} id="standard-uncontrolled" label="Value" defaultValue="" value={Value} onChange={e => setValue(e.target.value)} /><br></br><br></br>

                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">Asset Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Type}
                            label="Select Job"
                            onChange={e => setType(e.target.value)}

                            required
                        >
                            <MenuItem value="Def" disabled selected="true">Select Type</MenuItem>
                            { repo.map((repos) => (
                                <MenuItem value={repos._id} name={repos.type} >{repos.type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br></br><br></br>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Select Job"
                            onChange={e => setStatus(e.target.value)}

                            required
                        >
                            <MenuItem value="Def" disabled selected="true">Select Status</MenuItem>
                            { Defstatus.map((repos) => (
                                <MenuItem value={repos.name} name={repos.name} >{repos.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br></br><br></br>
                    
                   <Button variant="contained" color="primary"  type="submit" startIcon={<AddIcon/>}>
                        Add Asset
                    </Button></form><br></br><br></br>
            </div>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Asset Added successfuly!
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

export default AddAsset