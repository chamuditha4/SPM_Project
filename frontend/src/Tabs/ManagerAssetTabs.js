import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddAsset from '../Functions/Asset/AddAsset';
import AddAssetType from '../Functions/Asset/AddAssetType';
import EditAsset from "../Functions/Asset/EditAsset";
import RemoveAsset from "../Functions/Asset/RemoveAsset";
import AssetReport from "../Functions/Asset/AssetReport";
import AssignAsset from "../Functions/Asset/AssignAsset";
import SearchAsset from "../Functions/Asset/AssetSearch";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={7}>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor:  'background.paper',
        display: 'flex',
        height: 450,
    },
    tabs: {
        borderRight: `1px solid ${'divider'}`,
    },
}));

export default function AnnouncementTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>

            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >

                <Tab label="Add Asset" {...a11yProps(0)} />
                <Tab label="Edit Asset" {...a11yProps(1)} />
                <Tab label="Remove Asset" {...a11yProps(2)} />
                <Tab label="Add Asset type" {...a11yProps(3)} />
                <Tab label="Assign Asset" {...a11yProps(4)} />
                <Tab label="Search Asset" {...a11yProps(5)} />
                <Tab label="Asset Report" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <AddAsset/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <EditAsset/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <RemoveAsset/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AddAssetType/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <AssignAsset/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <SearchAsset/>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <AssetReport/>
            </TabPanel>
        </div>
    );
}
