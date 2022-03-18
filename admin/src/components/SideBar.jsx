import React from 'react';
import styled from 'styled-components';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { persistor } from '../redux/store';


const Container = styled.div`
flex: 1; 
height: calc(100vh-50px);
background-color: rgb(251,251,255);
position: sticky;
padding: 20px;

`

const Wrapper = styled.div`
padding: 0 30px;
color: #555;


`

const LeftNav = styled.div`
    color: teal; 
    font-size: 70px;
    font-weight: 900;
    margin-bottom: 30px;
`

const Menu = styled.div`
margin-bottom: 20px;
cursor: pointer;


`

const Title = styled.h2`
margin-bottom: 15px;
cursor: pointer;
color: rgb(187,186,186);
`

const Items = styled.ul`
list-style: none;
padding: 5px;

`

const Item = styled.li`
padding: 5px;
cursor: pointer;
border-radius: 10px;
display: flex;
align-items: center;
font-size: 25px;

&:hover{
    background-color: rgb(240,240,255);
    transform: scale(1.1);
  }

`

const Icon = styled.div`
font-size: 20px !important;
margin-right:5px;
`

const Styledlink = styled(Link)`
color: gray;
  text-decoration: none;
`;




const SideBar = () => {


    const handleLogout = async (e) => {
        e.preventDefault();


        await persistor.purge().then(() => window.location.reload(false));

    };
    return (
        <Container>
            <Wrapper >

                <LeftNav> TT</LeftNav>
                <Menu>
                    <Title>MAIN</Title>
                    <Items>
                        <Styledlink to="/"><Item><Icon><LineStyleIcon /></Icon>Home</Item></Styledlink>


                    </Items>
                </Menu>

                <Menu>
                    <Title>LISTS</Title>
                    <Items>

                        <Styledlink to="/users"><Item><Icon><PersonOutlineOutlinedIcon /></Icon>Users</Item></Styledlink>
                        <Styledlink to="/products"><Item><Icon><StorefrontIcon /></Icon>Products</Item></Styledlink>
                        <Styledlink to="/orders"><Item><Icon><AttachMoneyOutlinedIcon /></Icon>Orders</Item></Styledlink>
                        <Styledlink to="/shipping"><Item><Icon><LocalShippingOutlinedIcon /></Icon>Shipping</Item></Styledlink>
                    </Items>
                </Menu>

                <Menu>
                    <Title>USEFUL</Title>
                    <Items>
                        <Styledlink to="/analytics"><Item><Icon><TrendingUpIcon /></Icon>Analytics</Item></Styledlink>
                        <Styledlink to="/notifications"><Item><Icon><NotificationsNoneOutlinedIcon /></Icon>Notification</Item></Styledlink>


                    </Items>
                </Menu>

                <Menu>
                    <Title>SERVICE</Title>
                    <Items>

                        <Styledlink to="/system"><Item><Icon><ManageAccountsOutlinedIcon /></Icon>System</Item></Styledlink>
                        <Styledlink to="/loghistory"><Item><Icon><HistoryOutlinedIcon /></Icon>Log History</Item></Styledlink>
                        <Styledlink to="/setting"><Item><Icon><SettingsOutlined /></Icon>Setting</Item></Styledlink>
                    </Items>
                </Menu>

                <Menu>
                    <Title>USER</Title>
                    <Items>

                        <Styledlink to="/login"><Item><Icon><LoginOutlinedIcon /></Icon>Log In</Item></Styledlink>
                        <Item
                            style={{
                                color: 'gray',
                                textDecoration: 'none'
                            }}
                            
                            onClick={(e) => {handleLogout(e)}}>
                            <Icon><LogoutIcon/>
                            </Icon>Log Out</Item>
                    </Items>
                </Menu>

            </Wrapper >
        </Container >
    )
};

export default SideBar;
