import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import  './../../styles/App.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RemoveAsset() {
    const [open, setOpen] = React.useState(false);
    const [Selection, setSelection] = useState('');
    const [open2, setOpen2] = React.useState(false);
    const [repo,setRepo] = useState([]);
    const [disable, setdisable] = useState('true');


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

        if(window.confirm("Are you sure want to delete?")===true){

            try{
                axios.delete(`http://localhost:4000/asset/delete-asset/${Selection}`)
                    .then(res => console.log(res.data));
                handleClick();
                window.location.reload();
            }
            catch(err){
                handleClick2();
            }


        }else{

        }

        

    }

    const handleSelection = async (event) => {
        setSelection(event.target.value);
        try{
            await setdisable(false);
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
                <h2>Remove Assets</h2>

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

                   <Button disabled={disable} variant="contained" color="primary"  type="submit" startIcon={<RemoveCircleOutlineIcon/>}>
                        Remove Asset
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
                <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                    <Alert onClose={handleClose2} severity="warning" sx={{ width: '100%' }}>
                        Something went wrong, Please try again!
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}

export default RemoveAsset