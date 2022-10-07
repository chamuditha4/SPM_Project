import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import  './../../styles/App.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddAssetType() {
    const [open, setOpen] = React.useState(false);
    const [Name, setName] = useState('');
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

    function onSubmit(event) {
        event.preventDefault();
        if (Name.length === 0 || Description.length === 0){
            handleClick1();
        }else{

            try{
                const taskOBJ = {
                    type: Name,
                    description: Description
                };
                axios.post('http://localhost:4000/asset/create-asset-type', taskOBJ)
                    .then(res => console.log(res.data));
                setName('');
                setDescription('');
                handleClick();
            }
            catch(err){
                handleClick2();
            }

        }

    }
    return (
        <div>
            <div className="prof">
                <h2>Add Asset Types</h2>
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
                    <Button variant="contained" color="primary"  type="submit" startIcon={<AddIcon/>}>
                        Add Asset Type
                    </Button></form><br></br><br></br>
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

export default AddAssetType