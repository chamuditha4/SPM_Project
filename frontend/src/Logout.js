import { removeUserSession } from './Utils/Common';
import React, { useEffect  } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Logout() {
  const [open, setOpen] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
    const handleLogout = () => {
        removeUserSession();
       window.location.href = "/Login";
      }

      const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        handleLogout();
        setOpen(false);
      };

      useEffect(() => handleClick(),[]);
  
      return (
        <div>
          
        <div>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={500} onClose={handleClose}>
              <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                Logging Out!
              </Alert>
            </Snackbar>
          </Stack>
        </div>
        </div>
      )
    }
    
  
    export default Logout