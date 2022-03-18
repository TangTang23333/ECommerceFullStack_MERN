import React from 'react';
import styled from 'styled-components';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Badge from '@mui/material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import pic from './Profile.png';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../redux/store';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';


const Container = styled.div`
    padding: 20px 20px;
    justify-content: flex-end;
    display: flex;
    margin-bottom: 30px;
`




const RightNav = styled.div`
display: flex;
align-items: center;
justify-content: space-between; 

`

const Icons = styled.div`
margin-left: 10px;
font-size: 20px;
color: grey;
cursor: pointer;

`

const ProfilePic = styled.img`
border-radius: 50%; 
height:70px;
width: 70px;
margin-left: 10px; 
`


const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {

    //await saveUserCart();
    //await saveUserFavorite();
    // now wait for saveUser to finish...
    // and wipe all states 
    persistor.purge().then(() => window.location.reload(false));
    navigate('/login');
  };


  return (


    <Container>


      {/* <LeftNav> TT</LeftNav> */}

      <RightNav>
        

        {/* <Icons>
          <WbSunnyOutlinedIcon style={{ fontSize: 40, paddingTop: 16 }} />
        </Icons> */}

        {/* <Icons>
          <FullscreenExitOutlinedIcon style={{ fontSize: 40, paddingTop: 16 }} />
        </Icons> */}

        <Icons>
          <ListOutlinedIcon style={{ fontSize: 40 }} />
        </Icons>


        <Icons>
          <Badge badgeContent={1} color='primary'>
            <NotificationsNoneOutlinedIcon style={{ fontSize: 40 }} />
          </Badge>
        </Icons>


        <Icons>
          <Badge badgeContent={3} color='primary'>
            <ChatBubbleOutlineOutlinedIcon style={{ fontSize: 40 }} />
          </Badge>
        </Icons>


        <Icons>
          <SettingsOutlinedIcon style={{ fontSize: 40}} />
        </Icons>


      </RightNav>

    </Container>
  )
};


export default NavBar;