import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import pic from './Profile.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector, useDispatch } from 'react-redux';
import {getUsers} from '../redux/apiCalls'
import { useSearchParams } from 'react-router-dom';

const Container = styled.div`
flex:1;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
border-radius: 10px;
padding: 20px;
margin-right: 20px;
`

const Title = styled.h2`
font-size: 22px;
font-weight: 600;
margin-bottom: 20px;
`


const UserList = styled.ul`
margin: 0;
padding: 0;
list-style: none;
`



const User = styled.li`
display:flex;
margin: 20px 0px;
align-items: center;
justify-content: space-between;

`


const StaffImg = styled.img`
border-radius: 50%; 
height: 50px;
width: 50px;
margin-right: 20px;
object-fit: cover;

`


const Content = styled.div`
display:flex;
flex-direction: column;
margin-right: 20px;
text-align: left;
width: 150px;
`


const StaffName = styled.h3`
`

const StaffTitle = styled.h3``

const Button = styled.button`
border-radius: 10%;
border: 0;
display: flex;
align-items: center;
`




const Widget = (props) => {
    
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);


    useEffect(() => {

        getUsers(dispatch);
    }, [user, dispatch]);


    const sortedUsers = [...users]; 
    sortedUsers.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    });

    

    return (
        <Container>
            <Title>New Join Members</Title>
            <UserList >
                {sortedUsers.map((each) => (
                    <User key={each._id}>
                        <StaffImg src={each.profilePic || pic} alt='' />
                        <Content>
                            <StaffName>{each.username}</StaffName>
                            <StaffTitle>{each.createdAt.slice(0, 10)}</StaffTitle>
                        </Content>

                        <Button>
                            <VisibilityIcon style={{ marginRight: '10px' }} />
                            <p >Details </p>
                        </Button>
                    </User>
                ))}

            </UserList>

        </Container>
    )
}

export default Widget;