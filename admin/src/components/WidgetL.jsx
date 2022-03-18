import axios from 'axios';
import React, { useState, useEffect } from 'react'
import pic from './Profile.png';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {format} from 'timeago.js';
import {userRequest} from '../requestMethod';
import {getOrders} from '../redux/apiCalls';


const Container = styled.div`
flex:2;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
border-radius: 10px;
padding: 20px;
`

const Title = styled.h2`
margin-bottom: 20px;
font-size: 22px;
font-weight: 600;
`




const StaffImg = styled.img`
border-radius: 50%; 
height: 70px;
width: 70px;
margin-right: 20px;

`


const Table = styled.table`
border-spacing: 10px;
width: 100%;
justify-content: space-around;
`

const TableHead = styled.thead`
font-size:23px;
font-weight: 600;
color:  rgb(187,186,186);
`


const TableRow = styled.tr`

`


const TableCell = styled.td`

`

const Button = styled.button`

background-color: ${(props) => (props.status === 'Completed' &&  '#e5faf2') || 
(props.status === 'Pending' && '#ebf1fe') || 
(props.status === 'Declined' &&  '#fff0f1') };

color:   ${(props) => (props.status === 'Completed' &&  '#3bb077') || 
(props.status === 'Pending' && '#2a7ade') || 
(props.status === 'Declined' &&  '#d95087') };      

border: none;
padding: 5px 10px;
cursor: pointer;
border-radius: 10px;


`

const Widget = () => {


    const orders = useSelector(state => state.order.orders);
    const user = useSelector(state => state.user.currentUser);
    const users = useSelector(state => state.user.users);
    const dispatch = useDispatch();


    


    useEffect(() => {
        getOrders(dispatch, users);
    }, [user, users, dispatch]);

    const sortedOrders = [...orders]; 
    


    return (
        <Container>
            <Title>Latest Transactions</Title>


            <Table>

                <TableHead>
                    <TableCell >Customer</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Status</TableCell>
                </TableHead>


                {sortedOrders.map((row) => (
                    <TableRow key={row.name}>

                        <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                            <StaffImg src={pic} />
                            <h3>{row.username}</h3>
                        </TableCell>
                        <TableCell>{format(row.createdAt)}</TableCell>
                        <TableCell>{'$ ' + row.amount}</TableCell>
                        <TableCell><Button status={row.status}>{row.status}</Button></TableCell>
                    </TableRow>
                ))}

            </Table>

        </Container>
    )
}

export default Widget;