import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ViewSubmission from '../Functions/Submission/ViewSubmission';
import RateSubmission from '../Functions/Submission/RateSubmission';

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

export default function SubmissionTabs() {
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
        <Tab label="View Submission" {...a11yProps(0)} />
        <Tab label="Rate Submission" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ViewSubmission/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RateSubmission/>
      </TabPanel>
    </div>
  );
}
