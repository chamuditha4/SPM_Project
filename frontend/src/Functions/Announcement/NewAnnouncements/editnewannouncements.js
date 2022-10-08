import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CookieService from '../../../API/Cookie'
import DoneIcon from '@material-ui/icons/Done';


import { addResearchs } from '../../../actions/researchActions';

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    title: {
        marginTop: theme.spacing(4),
    },
    input: {
        display: 'none',
    },
}));

const AddResearch = ({ location, history }) => {
    const inputRef = useRef()
    const inputRef2 = useRef()
    const [selectedFile, setselectedFile] = useState()
    const [uploadedFile, setuploadedFile] = useState()
    const [selectedImg, setselectedImg] = useState()
    const [uploadedImg, setuploadedImg] = useState()

    const [phoneNo, setphoneNo] = useState("")
    const [email, setemail] = useState("")
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [tag, settag] = useState("")

    const dispatch = useDispatch()
    const research = useSelector(state => state.research);

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        const token = CookieService.get()
        if (!token) {
            history.push(redirect)
        }

    }, [dispatch, history, research, redirect]);

    const data = {
        "phoneNo": phoneNo,
        "email": email,
        "title": title,
        "description": description,
        "tag": tag,
        "file": uploadedFile,
        "img": uploadedImg
    }

    const handleSubmit = async (e) => {
        e.preventDefault();;

        // console.log(data);

        dispatch(addResearchs(data))

        history.push('/')
    }

    const uploadImage = async () => {
        const formData = new FormData()
        formData.append("file", selectedImg);
        formData.append("upload_preset", "afproject");
        await axios.post(
            "https://api.cloudinary.com/v1_1/dxz8wbaqv/image/upload", formData
        ).then((response) => {
            setuploadedImg(response.data.url)
            console.log(response.data.url);
        })
    }

    const uploadFile = async () => {
        const formData = new FormData()
        formData.append("file", selectedFile);
        formData.append("upload_preset", "afproject");
        await axios.post(
            "https://api.cloudinary.com/v1_1/dxz8wbaqv/image/upload", formData
        ).then((response) => {
            setuploadedFile(response.data.url)
            console.log(response.data.url);
        })
    }

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" className={classes.title} variant="h4" align="center">
                        Add Research Paper
                    </Typography>
                    <React.Fragment>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <React.Fragment>
                                <Typography variant="h6" gutterBottom>
                                    Session Data
                                </Typography>
                                <Grid container spacing={3} >
                                    <Grid item xs={12} >
                                        <Grid item xs={12} >
                                            <TextField
                                                required
                                                name="title"
                                                label="Research Title"
                                                fullWidth
                                                value={title}
                                                onChange={(e) => settitle(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12} style={{ marginTop: 30 }}>
                                            <TextField
                                                required
                                                name="description"
                                                label="Description"
                                                fullWidth
                                                value={description}
                                                onChange={(e) => setdescription(e.target.value)} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} xs={6}>
                                        <div className="row">
                                            <div className="col-6">
                                                <Grid item xs={6} xm={3}>

                                                    <input
                                                        required
                                                        accept=".pdf"
                                                        className={classes.input}
                                                        id="contained-button-file2"
                                                        multiple
                                                        type="file"
                                                        onChange={() => setselectedFile(inputRef2.current.files[0])}
                                                        ref={inputRef2}
                                                    />
                                                    {!selectedFile ?
                                                        <label htmlFor="contained-button-file2">
                                                            <Button
                                                                style={{ width: 175 }}
                                                                variant="contained"
                                                                color="primary"
                                                                component="span"
                                                                className={classes.button}>
                                                                Upload Resaerch Documnet
                                                            </Button>
                                                        </label>
                                                        :
                                                        <div>
                                                            <label htmlFor="contained-button-file2">
                                                                <Button
                                                                    variant="contained"
                                                                    align="center"
                                                                    color="primary"
                                                                    component="span"
                                                                    onClick={() => setuploadedFile()}
                                                                    style={{ width: 175 }}>
                                                                    Change Resaerch Documnet
                                                                </Button>
                                                            </label>
                                                            {!uploadedFile ?
                                                                <Button
                                                                    variant="contained"
                                                                    align="center"
                                                                    color="primary"
                                                                    component="span"
                                                                    onClick={uploadFile}
                                                                    style={{ width: 175, background: "#4caf50", marginTop: 10 }}>
                                                                    Upload Resaerch Documnet
                                                                </Button>
                                                                :
                                                                <Button
                                                                    disabled
                                                                    startIcon={<DoneIcon />}
                                                                    variant="contained"
                                                                    align="center"
                                                                    color="primary"
                                                                    component="span"
                                                                    style={{ width: 175, color: "#fffff0", background: "#a5d6a7", marginTop: 10 }}>
                                                                    Uploaded
                                                                </Button>
                                                            }
                                                        </div>
                                                    }
                                                </Grid>
                                            </div>
                                            <div className="col-6">
                                                <Grid item xs={6} xm={3} >
                                                    {!uploadedFile ?
                                                        <div>
                                                            {!selectedFile ?
                                                                <img src="https://res.cloudinary.com/dxz8wbaqv/image/upload/v1624882655/afproject/1295253-200_zv5ytl.png" style={{ width: 150, height: 150 }} />
                                                                :
                                                                <img src="https://res.cloudinary.com/dxz8wbaqv/image/upload/v1624883038/afproject/free-pdf-download-icon-3388-thumb_nviuze.png" style={{ width: 150, height: 150 }} />
                                                            }
                                                        </div>
                                                        :
                                                        <img src="https://res.cloudinary.com/dxz8wbaqv/image/upload/v1624883038/afproject/free-pdf-download-icon-3388-thumb_nviuze.png" style={{ width: 150, height: 150 }} />}

                                                </Grid>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} xs={6}>
                                        <div className="row">
                                            <div className="col-6">
                                                <Grid item xs={6} xm={3}>
                                                    <input
                                                        required
                                                        accept="image/*"
                                                        className={classes.input}
                                                        id="contained-button-file"
                                                        multiple
                                                        type="file"
                                                        onChange={() => setselectedImg(inputRef.current.files[0])}
                                                        ref={inputRef}
                                                    />
                                                    {!selectedImg ?
                                                        <label htmlFor="contained-button-file">
                                                            <Button
                                                                style={{ width: 175 }}
                                                                variant="contained"
                                                                color="primary"
                                                                component="span"
                                                                className={classes.button}>
                                                                Select Cover Page
                                                            </Button>
                                                        </label>
                                                        :
                                                        <div>
                                                            <label htmlFor="contained-button-file">
                                                                <Button
                                                                    variant="contained"
                                                                    align="center"
                                                                    color="primary"
                                                                    component="span"
                                                                    onClick={() => setuploadedImg()}
                                                                    style={{ width: 175 }}>
                                                                    Change Cover Page
                                                                </Button>
                                                            </label>
                                                            {!uploadedImg ?
                                                                <Button
                                                                    variant="contained"
                                                                    align="center"
                                                                    color="primary"
                                                                    component="span"
                                                                    onClick={uploadImage}
                                                                    style={{ width: 175, background: "#4caf50", marginTop: 10 }}>
                                                                    Upload Cover Page
                                                                </Button>
                                                                :
                                                                <Button
                                                                    startIcon={<DoneIcon />}
                                                                    variant="contained"
                                                                    align="center"
                                                                    color="primary"
                                                                    component="span"
                                                                    style={{ width: 175, color: "#fffff0", background: "#a5d6a7", marginTop: 10 }}>
                                                                    Uploaded
                                                                </Button>
                                                            }
                                                        </div>
                                                    }

                                                </Grid>
                                            </div>
                                            <div className="col-6">
                                                <Grid item xs={6} xm={3} >
                                                    <div>
                                                        {!uploadedImg ?
                                                            <div>
                                                                {!selectedImg ?
                                                                    <img src="https://res.cloudinary.com/dxz8wbaqv/image/upload/v1624882656/afproject/1375232-200_w4et41.png" style={{ width: 150, height: 150 }} />
                                                                    :
                                                                    <img src={URL.createObjectURL(selectedImg)} style={{ width: 150, height: 150 }} />
                                                                }
                                                            </div>
                                                            :
                                                            <img src={uploadedImg} style={{ width: 150, height: 150 }} />
                                                        }
                                                    </div>
                                                </Grid>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            name="email"
                                            label="Email Address"
                                            fullWidth
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)} />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            name="phonenum"
                                            label="Phone Number"
                                            fullWidth
                                            value={phoneNo}
                                            onChange={(e) => setphoneNo(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            name="tag"
                                            label="Research Tag"
                                            fullWidth
                                            value={tag}
                                            onChange={(e) => settag(e.target.value)} />
                                    </Grid>
                                </Grid>
                                {uploadedImg && uploadedFile ?
                                    <div className={classes.buttons}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            value="Submit"
                                            className={classes.button}
                                        >
                                            Submit Details
                                        </Button>
                                    </div>
                                    :
                                    <div className={classes.buttons}>
                                        <Button variant="contained" disabled>
                                            Please Click Image Upload
                                        </Button>
                                    </div>
                                }

                            </React.Fragment>

                        </form>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    )
}

export default AddResearch