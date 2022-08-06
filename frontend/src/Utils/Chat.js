import React, { useEffect, useState  } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import  './../styles/App.css';
import axios from 'axios';
import ChatBubble from "./componets/ChatBubble";
import { getUser } from './Common';
var chatarr = [];

function Chat() {
  const user = getUser();
  const [Msg, setMsg] = useState([]);
  const [Text, setText] = useState('');

  const getRepo = () => {
    axios.get('http://localhost:4000/chat')
        .then(response => {
        // console.log(JSON.stringify(response.data));
        console.log(response);
          const myRepo = response.data;
          
          setMsg(myRepo);
        });
  };

  function autoselect(){
    chatarr=[];
    Msg.map((repos1) => ( chatarr.push({type:'0',image:repos1.image,text:repos1.text})));
    //console.log(Eids);
  }


  function onPut(event) {
    event.preventDefault();
    const chatOBJ = { eid: user._id,image: ('https://ui-avatars.com/api/?name=' + user.name) ,text: Text };
      axios.post('http://localhost:4000/chat/create-chat', chatOBJ)
      .then(response => {
        console.log(response);
      });
      getRepo();
    

  }

  useEffect(() => getRepo(),[]);

    return (
      <div>
        {autoselect()}
        <div>
          <ChatBubble messages = {chatarr}/><br></br><br></br>
          <form onSubmit={onPut}>
          <TextField id="standard-uncontrolled" style={{ width: 400 }} label="Message"  value={Text} onChange={e => setText(e.target.value)} /><br></br><br></br>
          <Button variant="contained" color="primary"  type="submit">
          Send
          </Button>
          </form><br></br><br></br>
        </div>
      </div>
    )
  }
  

  export default Chat