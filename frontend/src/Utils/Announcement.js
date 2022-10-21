import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'; 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {PDFDownloadLink, Page, Text, Svg, Line, Image, View, Document, StyleSheet, Font} from '@react-pdf/renderer';
import logo from '../images/Blue logo-cropped.png';
import Stack from "@mui/material/Stack";

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
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Title', width: 190 },
  { field: 'description', headerName: 'Announcement', width: 290 },
];
function Announcement() {
  const [repo,setRepo] = useState([]);
  const [Department,setDepartment] = useState('');
  const [table, settable] = useState('');
  const [rows,setrows] = useState([]);

  function onSubmit(event) {
    event.preventDefault();
    if (Department === ''){
      alert("Please Select Department!.");
    }else{
      setrows([]);
      axios.get('http://localhost:4000/Announcement/read/' +Department)
        .then(response => {
        // console.log(JSON.stringify(response.data));
        console.log(response);
          const data = response.data;
          for (let k in data){
            const row ={
              id:data[k]._id,
              name:data[k].name,
              department:data[k].department,
              description:data[k].description
            }
            console.log(row)
            setrows(rows => [...rows, row]);
          }
        });
      }
  }

  async function getRepo(){
    await axios.get('http://localhost:4000/Announcement/')
        .then(response => {
          // console.log(JSON.stringify(response.data));
          const data = response.data;
          for (let k in data){
            const row ={
              id:k,
              name:data[k].name,
              description:data[k].description
            }
            console.log(row)
            setrows(rows => [...rows, row]);
          }

        });
  };

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


          <Text style={styles.title}>Detailed Announcement Report</Text>
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
                <Text style={styles.text}>Name: {row.name}</Text>
                <Text style={styles.text}>Department: {row.department}</Text>
                <Text style={styles.text}>Announcement: {row.description}</Text>
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
      <div style={{ height: 690, width: 800, margin: '1% 2% 20% 20%', background:'#cecece6b'}}>
        <Stack spacing={2} sx={{ m: 4,mx: "auto" }}>
          <div>
            <h2>Announcement</h2>
            <form onSubmit={onSubmit}>
            <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Department}
              label="Select Department"
              onChange={e => setDepartment(e.target.value)}
              >
            <MenuItem value="Def" disabled selected="true">Select Department</MenuItem>
            <MenuItem value="IT" name="IT" >IT</MenuItem>
            <MenuItem value="Accounting" name="Accounting" >Accounting</MenuItem>
            <MenuItem value="Management" name="Management" >Management</MenuItem>
            </Select>
            </FormControl>
            <br></br><br></br>
            <Button variant="contained" color="primary" type="submit">
            Select Department
            </Button>
            </form><br></br><br></br>
          </div>

          <div style={{ height: 400, width: 600, margin:"auto", background:'#EEEEEE'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
          </div>
          <div>
            <PDFDownloadLink document={<PdfGen />} fileName="Announcement-Report.pdf" style={{
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
        </Stack>
      </div>
    )
  }
  
  export default Announcement