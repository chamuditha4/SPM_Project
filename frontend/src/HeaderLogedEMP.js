import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SalaryTab from './Tabs/SalaryTab';
import AttendanceTab from './Tabs/AttendanceTabs';
import Announcement from './Utils/Announcement';
import JobTabs from './Tabs/JobTabs';
import AssetTabs from './Tabs/EmpAssetTabs';
import { getUser } from './Utils/Common';
import Logout from './Logout';
import Profile from './Utils/Profile';
import logo from "./images/Blue logo-cropped.png";


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const user = getUser();

    if(user==null){
        window.location.href = "/Login";
    }
    else if(user.roll === "Manager"){
        window.location.href = "/MngDashBoard";
    }else{
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor:  'background.paper',
    },
}));

export default function EmpDashBoard() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className={classes.root}>
                <img src={logo} id="logo" alt="Logo"></img>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        scrollButtons="auto"
                        text-align="center"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="PROFILE" {...a11yProps(0)} />
                        <Tab label="WORK" {...a11yProps(1)} />
                        <Tab label="SALARY" {...a11yProps(2)} />
                        <Tab label="ATTENDANCE" {...a11yProps(3)} />
                        <Tab label="ASSETS" {...a11yProps(4)} />
                        <Tab label="ANNOUNCEMENT" {...a11yProps(5)} />
                        <Tab label="LOGOUT" {...a11yProps(6)} />

                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Profile/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <JobTabs/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SalaryTab/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <AttendanceTab/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <AssetTabs/>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Announcement/>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <Logout/>
                </TabPanel>

            </div>
        </div>
    );
}