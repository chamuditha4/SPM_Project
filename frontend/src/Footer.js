import React from 'react'
import  './styles/App.css';
import contact from './images/iconfinder_phone_281830.png';
import mail from './images/iconfinder_mail_281828 (1).png';
import linkdin from './images/Linkedin-Icon-Circle-Outline-Grey.png';
import youtube from './images/iconfinder_youtube_281826.png';

function Footer() {
  return (
    <div className="footerdiv">
     <footer>

        <p className= "copy" >© 2022 EmployeeManager®</p>
        <p className= "copy" >Created by DreamTeam Developers</p>

        <div className= "social">
        <a href="call:0778174156"><img className="contactuslogo" src ={contact} width="20" height="20" alt="Contact Us"/></a>
        <a href="mailto:employeemanager@outlook.com"><img className="contactuslogo" src ={mail} width="20" height="20" alt="Mail"/></a>
        <a href="https://www.linkedin.com"><img className="contactuslogo" src ={linkdin} width="20" height="20" alt="Linkdin"/></a>
        <a href="https://www.youtube.com" ><img className="contactuslogo" src ={youtube} width="20" height="20" alt="Youtube"/></a>
        </div> 

        </footer>
    </div>
  )
}

export default Footer