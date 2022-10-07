import React, { useEffect, useState  } from 'react';
import  './../../styles/App.css';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {PDFDownloadLink, Page, Text, Svg, Line, Image, View, Document, StyleSheet, Font} from '@react-pdf/renderer';
import logo from '../../images/Blue logo-cropped.png';
import SearchIcon from '@mui/icons-material/Search';

let Users = {};
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
    { field: 'name', headerName: 'User Name', width: 190 },
    { field: 'salary', headerName: 'Salary', width: 90 },
    { field: 'bonus', headerName: 'Bonus', width: 90 },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 function SalaryReport() {
  const [name, setname] = useState('');
     const [UserName, setUserName] = useState('');
  const [open1, setOpen1] = React.useState(false);
    const [rows,setrows] = useState([]);

 async function getRepo(){
     await axios.get('http://localhost:4000/users/')
         .then(res => {
                 const data = res.data;
                 setUserName(data);
                 for (const i in data){
                     Users[data[i]._id]=data[i].username;


                 }

             }
     );

      await axios.get('http://localhost:4000/salary')
      .then(response => {
       // console.log(JSON.stringify(response.data));
        const data = response.data;
          for (let k in data){
              const row ={
                  id:data[k]._id,
                  name:Users[`${data[k].eid}`],
                  salary:data[k].salary,
                  bonus:data[k].bonus
              }
              console.log(row)
              setrows(rows => [...rows, row]);
          }

      });
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

  async function onSubmit(event) {
    event.preventDefault();
      setrows([]);
      try{
          await axios.get(`http://localhost:4000/salary/get-salary/${name._id}`)
              .then(res => {
                      const data = res.data;
                      for (let k in data){
                          const row ={
                              id:data[k]._id,
                              name:Users[`${data[k].eid}`],
                              salary:data[k].salary,
                              bonus:data[k].bonus
                          }
                          setrows(rows => [...rows, row]);
                      }
                  }
              );
      }catch (e){
          console.log(e)
          handleClick1();
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


                 <Text style={styles.title}>Detailed Salary Report</Text>
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
                         <Text style={styles.text}>User: {row.name}</Text>
                         <Text style={styles.text}>Salary: {row.salary}</Text>
                         <Text style={styles.text}>Bonus: {row.bonus}</Text>
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
        <div style={{ height: 690, width: 800, margin: '1% 2% 2% 2%', background:'#cecece6b'}}>
            <Stack spacing={2} sx={{ m: 4,mx: "auto" }}>
              <h2>Salary Report</h2>
              <div style={{ margin:"auto"}}>
                  <Stack direction="row" spacing={2} sx={{ m: 4,mx: "auto" }}>
                      <form onSubmit={onSubmit}>
                          <Autocomplete
                            onChange={(event, value) => setname(value)}
                            values={name}
                            id="tags-standard"
                            limitTags={1}
                            size="small"
                            options={UserName}
                            getOptionLabel={(option) => option.username}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                style={{ width: 350 }}
                                variant="standard"
                                label="User Name"
                                placeholder="Names"
                              />
                            )}
                          />
                          <br></br>
                          <Button variant="contained" color="primary"  type="submit" startIcon={<SearchIcon/>}>Search</Button>
                      </form>
                  </Stack>
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
                    <PDFDownloadLink document={<PdfGen />} fileName="Salary-Report.pdf" style={{
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

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
              Something Wrong!
            </Alert>
          </Snackbar>
        </Stack>

      </div>
    )
  }
  
  export default SalaryReport