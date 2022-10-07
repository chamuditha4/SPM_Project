import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UsersTabs from './Tabs/UsersTabs';
import MngerAttendanceTabs from './Tabs/MngerAttendanceTabs';
import TasksTabs from './Tabs/TasksTabs';
import AnnouncementTabs from './Tabs/AnnouncementTabs';
import MngerSalaryTabs from './Tabs/MngerSalaryTabs';
import logo from "./images/Blue logo-cropped.png";
import { getUser } from './Utils/Common';
import AssetTab from './Tabs/ManagerAssetTabs';
import Logout from './Logout';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const user = getUser();


    if(user==null){
        window.location.href = "/Login";
    }
    else if(user.roll === "Manager"){
    }else{
        window.location.href = "/EmpDashBoard";
    }



    return (
        <div>
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

export default function MngrDashBoard() {

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
                        <Tab label="USERS" {...a11yProps(0)} />
                        <Tab label="WORK" {...a11yProps(1)} />
                        <Tab label="ANNOUNCEMENT" {...a11yProps(2)} />
                        <Tab label="ATTENDANCE" {...a11yProps(3)} />
                        <Tab label="ASSETS" {...a11yProps(4)} />
                        <Tab label="SALARY" {...a11yProps(5)} />
                        <Tab label="LOGOUT" {...a11yProps(6)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <UsersTabs/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TasksTabs/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <AnnouncementTabs/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <MngerAttendanceTabs/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <AssetTab/>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <MngerSalaryTabs/>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <Logout/>
                </TabPanel>

            </div>

        </div>
    );
}