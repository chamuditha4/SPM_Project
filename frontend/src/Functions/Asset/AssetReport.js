import React, {useEffect, useState} from 'react';
import  './../../styles/App.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import { getUser } from './../../Utils/Common';
import {PDFDownloadLink, Page, Text, Svg, Line, Image, View, Document, StyleSheet} from '@react-pdf/renderer';
import logo from '../../images/Blue logo-cropped.png';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let Types = {};
let Users = {};

const columns  = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'status', headerName: 'Status', width: 90 },
    { field: 'value', headerName: 'Value', width: 80 },
    { field: 'user', headerName: 'Assigned User', width: 150 },
];

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

function AssetReport() {
    const user = getUser();
    const [open, setOpen] = React.useState(false);
    const [rows,setrows] = useState([]);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);



    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };


    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const StartFunc = async () =>{
        try{
            await axios.get('http://localhost:4000/asset/gettypes')
                .then(res => {
                    const data = res.data;
                    for (const i in data){
                        Types[data[i]._id]=data[i].type;


                    }
                    console.log(Types)

                }
            );

            await axios.get('http://localhost:4000/users/')
                .then(res => {
                        const data = res.data;
                        for (const i in data){
                            Users[data[i]._id]=data[i].username;


                        }
                        console.log(Types)

                    }
            );

            await axios.get('http://localhost:4000/asset/searchbyId/' + user._id)
                .then(res => {
                        const data = res.data;
                        for (let k in data){
                            const row ={
                                id:k,
                                name:data[k].name,
                                description:data[k].description,
                                type:Types[`${data[k].type}`],
                                status:data[k].status,
                                value:data[k].value,
                                user:Users[`${data[k].employee}`]
                            }
                            setrows(rows => [...rows, row]);
                        }
                    }
                );

        }catch (e) {
            console.log(e)
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


                <Text style={styles.title}>Detailed Asset Report</Text>
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
                        <Text style={styles.subtitle}>Asset Name: {row.name}</Text>
                        <Text style={styles.text}>Description: {row.description}</Text>
                        <Text style={styles.text}>Type: {row.type}</Text>
                        <Text style={styles.text}>Status: {row.status}</Text>
                        <Text style={styles.text}>Value: {row.value}</Text>
                        <Text style={styles.text}>Assigned To : {row.user}</Text>
                        <Text style={styles.text}>.......</Text>
                    </View>
                    ))}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );


    useEffect(() => StartFunc(),[]);
    return (
        <div>
            <div style={{ height: 550, width: 900, margin: '1% 2% 2% 2%', background:'#cecece6b'}}>
                <Stack spacing={2} sx={{ m: 4,mx: "auto" }}>
                    <h2>ASSET REPORT</h2>
                    <div style={{ height: 400, width: 750, margin:"auto", background:'#EEEEEE'}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div>
                    <div>
                            <PDFDownloadLink document={<PdfGen />} fileName="Asset-Report.pdf" style={{
                                borderRadius: 5,
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
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Asset Type Added successfuly!
                    </Alert>
                </Snackbar>
            </Stack>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                    <Alert onClose={handleClose1} severity="warning" sx={{ width: '100%' }}>
                        Please Fill Everything!
                    </Alert>
                </Snackbar>
            </Stack>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                    <Alert onClose={handleClose2} severity="warning" sx={{ width: '100%' }}>
                        Something went wrong, Please try again!
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}

export default AssetReport