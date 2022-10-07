import React, { useEffect, useState  } from 'react';
import  './../../styles/App.css';
import axios from 'axios';
import { getUser } from './../../Utils/Common';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {PDFDownloadLink, Page, Text, Svg, Line, Image, View, Document, StyleSheet} from '@react-pdf/renderer';
import logo from '../../images/Blue logo-cropped.png';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

let Users = {};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// PDF report style
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    textAlign:'center'
  },
  text: {
    margin: 12,
    fontSize: 14,
    fontFamily: 'Times-Roman',
    textAlign:'center'
  },
  bold: {
    margin: 12,
    fontSize: 14,
    fontWeight:'bold',
    fontFamily: 'Times-Roman',
    textAlign:'center'
  },
  image: {
    width:'150px',
    display:'block',
    margin: '3% auto'
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  page: {
    padding: 60
  },
});
const columns  = [
  { field: 'id', headerName: 'ID', width: 170 },
  { field: 'time', headerName: 'Time', width: 190 },
  { field: 'employee', headerName: 'Employee', width: 90 },
  { field: 'log', headerName: 'Log', width: 90 },
];

function ProgressReport() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const user = getUser();
  const [repo,setRepo] = useState([]);
  const [Id, setId] = useState('');
  const [rows,setrows] = useState([]);

  const getRepo = async () => {
    try{
      // Hide table
      const table = document.getElementById('table');
      table.style.visibility = 'hidden';

      // main
      const main = document.getElementById('main');
      main.setAttribute("style","height:200px; width: 800px; margin: 10% 2% 2% 20%; padding:2%; background:#cecece6b;");

      await axios.get('http://localhost:4000/tasks/' + user._id)
          .then(response => {
            // console.log(JSON.stringify(response.data));
            const myRepo = response.data;
            setRepo(myRepo);
      });
      try{
        await axios.get('http://localhost:4000/users/')
            .then(res => {
                  const data = res.data;
                  for (const i in data){
                    Users[data[i]._id]=data[i].username;
                  }
                }
            );
      }catch (err) {
        console.log(err)
        handleClick();
      }

    }catch (e) {
      console.log(e)
      handleClick();
    }

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

  const handleClick1 = () => {
    setOpen1(true);
  };

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };

  async function handleChange(value) {
    if(!value){
      handleClick1();
    }else{
      try{
        setId(value);
        setrows([]);
        await axios.get('http://localhost:4000/Submission/' +value._id)
            .then(response => {
              const data = response.data;
              for (let k in data){
                const row ={
                  id:data[k]._id,
                  time:`${data[k].time_start} - ${data[k].time_end}`,
                  employee:Users[`${data[k].eid}`],
                  log:data[k].log
                }
                console.log(row)
                setrows(rows => [...rows, row]);
              }
            });
      }catch (e) {
        handleClick();
        console.log(e)
      }finally {
        // main
        const main = document.getElementById('main');
        main.setAttribute("style","height:590px; width: 800px; margin: 1% 2% 2% 20%; padding:2%; background:#cecece6b;");

        // Show table
        const table = document.getElementById('table');
        table.style.visibility = 'visible';
      }
    }


    
  }

  const PdfGen = () =>(
      <Document>
        <Page size="A4" style={styles.page}>
          <Image
              style={styles.image}
              src={logo}
          />
          <Svg height="5" width="500">
            <Line
                x1="0"
                y1="0"
                x2="1000"
                y2="0"
                strokeWidth={3}
                stroke="rgb(66,165,245)"
            />
          </Svg>


          <Text style={styles.title}>Detailed Progress Report</Text>
          <Svg height="50" width="500">
            <Line
                x1="0"
                y1="0"
                x2="1000"
                y2="0"
                strokeWidth={3}
                stroke="rgb(66,165,245)"
            />
          </Svg>
          {rows.map((row) => (
              <View>
                <Text style={styles.text}>.......</Text>
                <Text style={styles.subtitle}>Id: {row.id}</Text>
                <Text style={styles.text}>Time: {row.time}</Text>
                <Text style={styles.text}>Employee: {row.employee}</Text>
                <Text style={styles.text}>Log: {row.log}</Text>
                <Text style={styles.text}>.......</Text>
              </View>
          ))}
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
          )} fixed />
        </Page>
      </Document>
  );

  useEffect(() => getRepo(),[]);
    return (
      <div>
        <div id='main'>
          <Stack spacing={2} sx={{ m: 4,mx: "auto" }}>
          <h2>Progress Report</h2>
          <div  style={{ margin:"1% 2% 2% 2%"}}>
            <Autocomplete
                onChange={(event, value) => handleChange(value)}
                values={Id}
                id="tags-standard"
                limitTags={1}
                size="small"
                options={repo}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        style={{ width: 350 }}
                        variant="standard"
                        label="Task Name"
                        placeholder="Task Name"
                    />
                )}
            />
          </div>
            <div id='table'>
              <div style={{ height: 400, width: 600, margin:"auto", background:'#EEEEEE'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
              </div>
              <div>
                <PDFDownloadLink document={<PdfGen />} fileName="progress-Report.pdf" style={{
                  borderRadius: 30,
                  backgroundColor: "#42a5f5",
                  padding: "8px 50px",
                  fontSize: "15px",
                  color:"white",
                  '&:hover': {
                    backgroundColor: '#42a5f5',
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}>
                  {({ blob, url, loading, error }) =>
                      loading ? 'Loading document...' : 'Download Detailed PDF Report'
                  }
                </PDFDownloadLink>
              </div>
            </div>
          </Stack>
        </div>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Something wrong!.
            </Alert>
          </Snackbar>
        </Stack>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
              Please select task to show Submission!
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    )
  }
  
  export default ProgressReport