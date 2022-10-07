import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Jobs from '../Functions/Submission/Jobs/Jobs';
import RatedSubmission from '../Functions/Submission/RatedSubmission';
import Submitprogress from '../Functions/Submission/Submitprogress';

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
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${'divider'}`,
  },
}));

export default function JobTabs() {
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
        <Tab label="TASKS" {...a11yProps(0)} />
        <Tab label="SUBMIT PROGRESS" {...a11yProps(1)} />
        <Tab label="FEEDBACK FROM CLIENT" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Jobs/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Submitprogress/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RatedSubmission/>
      </TabPanel>
    </div>
  );
}
