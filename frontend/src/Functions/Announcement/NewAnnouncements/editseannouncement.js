import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PeopleIcon from '@material-ui/icons/People';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getAllUsers } from '../../../actions/usersActions';
import { updateUserByAdmin } from '../../../actions/usersActions'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        marginTop: 65,
        position: 'inherit',
        whiteSpace: 'nowrap',
        width: drawerWidth,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    table: {
        minWidth: 650,
    },
}));

const AdminResearch = () => {
    const classes = useStyles();
    const [role, setrole] = useState()
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();
    const data = useSelector(state => state.users)
    useEffect(() => {

        dispatch(getAllUsers());

    }, [dispatch, open])

    const handleChange = (event) => {
        setrole(event.target.value);
        console.log(role);
    };

    const handelSubmit = (id) => {
        const data = {
            "userID": id,
            "role": role
        }
        dispatch(updateUserByAdmin(data))
    }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const [openedRow, setOpenedRow] = useState()

    const handleClickOpen = (row) => {
        setOpenedRow(row)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div>
                    <ListSubheader inset>Actions</ListSubheader>
                    <Link to={'/admin'} style={{ textDecoration: "none", color: "#00000f" }}>
                        <ListItem button>
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </Link>
                    <Link to={'/admin/sessions'} style={{ textDecoration: "none", color: "#00000f" }}>
                        <ListItem button>
                            <ListItemIcon>
                                <SwitchVideoIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sessions" />
                        </ListItem>
                    </Link>
                    <Link to={'/admin/research'} style={{ textDecoration: "none", color: "#00000f" }}>
                        <ListItem button>
                            <ListItemIcon>
                                <InsertDriveFileIcon />
                            </ListItemIcon>
                            <ListItemText primary="Research Papers" />
                        </ListItem>
                    </Link>
                    <Link to={'/admin/users'} style={{ textDecoration: "none", color: "#00000f" }}>
                        <ListItem button>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </Link>
                </div>
                <Divider />
                <div>
                    <ListSubheader inset>Sub Actions</ListSubheader>
                    <Link to={'/templates'} style={{ textDecoration: "none", color: "#00000f" }}>
                        <ListItem button>
                            <ListItemIcon>
                                <AttachmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Template Files" />
                        </ListItem>
                    </Link>
                </div>
            </Drawer>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User Full Name</TableCell>
                                    <TableCell align="center">Gender</TableCell>
                                    <TableCell align="center">User Type</TableCell>
                                    <TableCell align="center">Change Type</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.users && data.users.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">{row.fullName}</TableCell>
                                        <TableCell align="center">
                                            {row.gender}
                                        </TableCell>
                                        <TableCell align="center">{roles = row.role}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleClickOpen(row)} color="primary" aria-label="upload picture" component="span">
                                                <EditIcon />
                                            </IconButton>
                                            {openedRow && (
                                                <Dialog
                                                    open={open}
                                                    TransitionComponent={Transition}
                                                    keepMounted
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-slide-title"
                                                    aria-describedby="alert-dialog-slide-description"
                                                >
                                                    <DialogTitle id="alert-dialog-slide-title">{"Change User Type"}</DialogTitle>
                                                    <DialogContent>
                                                        <FormControl variant="outlined" className={classes.formControl}>
                                                            <Select
                                                                style={{ width: "300px" }}
                                                                native
                                                                value={role}
                                                                onChange={handleChange}
                                                                label="Age"
                                                                inputProps={{
                                                                    name: 'role',
                                                                    id: 'outlined-age-native-simple',
                                                                }}
                                                            >
                                                                <option aria-label="None" value="" />
                                                                <option value={"Admin"}>Admin</option>
                                                                <option value={"Reviwer"}>Reviwer</option>
                                                                <option value={"Editor"}>Editor</option>
                                                            </Select>
                                                        </FormControl>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose} color="primary">
                                                            cancel
                                                        </Button>
                                                        {role ?
                                                            <Button variant="contained" color="primary"
                                                                onClick={() => handelSubmit(openedRow._id)}>
                                                                Update User Type
                                                            </Button>
                                                            :
                                                            <Button variant="contained" color="primary" disabled>
                                                                Update User Type
                                                            </Button>
                                                        }
                                                    </DialogActions>
                                                </Dialog>
                                            )}

                                        </TableCell>
                                        <TableCell align="center" size="small">

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </main>
        </div>
    );
}

export default AdminResearch;