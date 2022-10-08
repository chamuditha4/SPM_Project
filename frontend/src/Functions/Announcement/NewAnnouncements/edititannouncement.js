import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
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
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import SessionView from '../../sessions/sessoinview/SessionView'
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CookieService from '../../../API/Cookie'
import { getSessions, adminApprovels, adminReject } from '../../../actions/sessionActions';

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
        width: '1200px'


    },
}));

const AdminSession = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const { loading, sessions, error } = useSelector(state => state.sessions);

    useEffect(() => {

        const token = CookieService.get()
        if (!token) {
            history.push(redirect)
        }

        dispatch(getSessions());

    }, [history, redirect, open]);

    const adminApprovel = (key) => {
        console.log('requested ' + key);
        dispatch(adminApprovels(key))
    }

    const ignoreSession = (id) => {
        console.log('ignore id', id);
        dispatch(adminReject(id))
    }
    const [openedRow, setOpenedRow] = useState()
    const handleClickOpen = (row) => {
        setOpenedRow(row)
        setOpen(true);
    };

    const handleClose = () => {
        console.log("clicked");
        setOpen(false);
        console.log(open);
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
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

            <div className={classes.root}>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <TableContainer component={Paper}>
                            <Typography component="h1" className={classes.title} variant="h4" align="center">
                                All Sessions For Admin Approvel
                            </Typography>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Session Name</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Researcher Name</TableCell>
                                        <TableCell align="center">Session Price</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sessions && sessions.map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell component="th" scope="row">{row.sessionName}</TableCell>
                                            <TableCell align="center">
                                                {row.approvel.isApproved == 0 ?
                                                    <div className="badge bg-warning text-wrap">
                                                        Pending
                                                    </div>
                                                    :
                                                    null}

                                                {row.approvel.isApproved == 1 ?
                                                    <div className="badge bg-warning text-wrap">
                                                        Waiting Approvel
                                                    </div>
                                                    :
                                                    null}

                                                {row.approvel.isApproved == 2 ?
                                                    <div className="badge bg-primary text-wrap">
                                                        Approved
                                                    </div>
                                                    :
                                                    null}

                                                {row.approvel.isApproved == 3 ?
                                                    <div className="badge bg-danger text-wrap">
                                                        Rejected
                                                    </div>
                                                    :
                                                    null}
                                            </TableCell>
                                            <TableCell align="center">{row.researcherName}</TableCell>
                                            <TableCell align="center">${row.sessionPrice}</TableCell>
                                            {
                                                openedRow && (
                                                    <div className={classes.input}>
                                                        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                                                            <AppBar className={classes.appBar}>
                                                                <Toolbar>
                                                                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                    <Typography variant="h6" className={classes.title}>
                                                                        {openedRow.sessionName}
                                                                    </Typography>
                                                                </Toolbar>
                                                            </AppBar>
                                                            <SessionView post={openedRow} />
                                                        </Dialog>
                                                    </div>
                                                )
                                            }
                                            <TableCell align="left">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleClickOpen(row)}
                                                    className={classes.button}
                                                    startIcon={<VisibilityIcon />}
                                                >
                                                    View
                                                </Button>
                                                {row.approvel.isApproved == 0 ?
                                                    <Button
                                                        disabled
                                                        variant="contained"
                                                        style={{ marginLeft: "5px" }}
                                                        size="small"
                                                        className={classes.button}
                                                        startIcon={< CheckCircleIcon />}
                                                    >
                                                        Editor Review
                                                    </Button>
                                                    :
                                                    null}
                                                {row.approvel.isApproved == 1 ?
                                                    <Button
                                                        style={{ marginLeft: "5px", background: "#4caf50", color: "#fffff0" }}
                                                        variant="contained"
                                                        size="small"
                                                        className={classes.button}
                                                        onClick={() => adminApprovel(row._id)}
                                                        startIcon={< CheckCircleIcon />}
                                                    >
                                                        Approve
                                                    </Button>
                                                    :
                                                    null}

                                                {row.approvel.isApproved == 2 ?
                                                    <Button
                                                        variant="contained"
                                                        style={{ marginLeft: "5px", background: "#f44336", color: "#fffff0" }}
                                                        size="small"
                                                        className={classes.button}
                                                        onClick={() => ignoreSession(row._id)}
                                                        startIcon={<RemoveCircleIcon />}
                                                    >
                                                        Remove
                                                    </Button>
                                                    :
                                                    null}

                                                {row.approvel.isApproved == 3 ?
                                                    <Button
                                                        variant="contained"
                                                        style={{ marginLeft: "5px", background: "#4caf50", color: "#fffff0" }}
                                                        size="small"
                                                        className={classes.button}
                                                        startIcon={< CheckCircleIcon />}
                                                    >
                                                        Editor Review
                                                    </Button>
                                                    :
                                                    null}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </main>
            </div >
        </div>
    );
}

export default AdminSession;