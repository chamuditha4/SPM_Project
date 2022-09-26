import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewTasks from '../Functions/Submission/Tasks/NewTasks';
import EditTasks from '../Functions/Submission/Tasks/EditTasks';
import RemoveTasks from '../Functions/Submission/Tasks/RemoveTasks';
import ProgressReport from '../Functions/Submission/ProgressReport';
import RateSubmission from '../Functions/Submission/RateSubmission';
import Submission from '../Functions/Submission/Submission';

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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:  'background.paper',
    display: 'flex',
    height: 400,
  },
  tabs: {
    borderRight: `1px solid ${'divider'}`,
  },
}));

export default function TasksTabs() {
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
        <Tab label="NEW TASK" {...a11yProps(0)} />
        <Tab label="EDIT TASK" {...a11yProps(1)} />
        <Tab label="REMOVE TASK" {...a11yProps(2)} />
          <Tab label="SUBMISSION" {...a11yProps(3)} />
          <Tab label="RATE TASK" {...a11yProps(4)} />
          <Tab label="PROGRESS REPORT" {...a11yProps(5)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <NewTasks/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EditTasks/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RemoveTasks/>
      </TabPanel>
        <TabPanel value={value} index={3}>
            <Submission/>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <RateSubmission/>
        </TabPanel>
        <TabPanel value={value} index={5}>
            <ProgressReport/>
        </TabPanel>
    </div>
  );
}
