import styled from 'styled-components';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {userRequest} from '../requestMethod';


const Container = styled.div` 
width: 100%;
display:flex;
justify-content: space-between;
margin-bottom: 40px;
`

const Card = styled.div`
flex:1;
-webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
border-radius: 10px;
padding: 30px;
cursor: pointer;
margin: 0 20px;
`


const Title = styled.h2`
margin-bottom: 25px;
color: rgb(187,186,187);
`


const Details = styled.div`
display: flex;
align-items: center;
margin: 10px 0px;
`


const Number = styled.h2`
font-size: 30px;
font-weight: 600;
margin-right: 20px;
`

const Icon = styled.div.attrs(props =>
    ({ className: props.className }))`

&.pos {
    color: green;
}

&.neg {
    color: red;
}
font-size: 20px;
color: green; 
align-items: center;
display: flex;
`

const ComparedToLastMonth = styled.div`
display: flex;
align-items: center;
`

const Styledlink = styled(Link)`
color: gray;
text-decoration: underline;
`;


const Summary = () => {


    const [income, setIncome] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const user = useSelector(state => state.user.currentUser);



    useEffect(() => {
        const getIncome = async () => {

            try {
                const res = await userRequest.get('orders/income');
                console.log(res.data[0], res.data[1]);
                setIncome(res.data[0].total);
                setPercentage( (res.data[0].total - (res.data[1] ? res.data[1].total : 0)) / res.data[0].total *100  );


            } catch (err) {
                console.log(err);
            }
        };


        getIncome();


    }, [user]);


    return (
        <Container>



            <Card >


                <Title>USERS</Title>

                <Details>
                    <Number>70</Number>
                    <ComparedToLastMonth>
                        <h4>12</h4>
                        <Icon className='neg'><ArrowDownwardOutlinedIcon /></Icon>
                    </ComparedToLastMonth>

                </Details>
                <Styledlink to='/users'>See all users</Styledlink>




            </Card>


            <Card >


                <Title>ORDERS</Title>

                <Details>


                    <Number>$ {income}</Number>
                    <ComparedToLastMonth>
                        <h4>{Math.floor(percentage)} % </h4>
                        {percentage < 0
                            ? <Icon className='neg'><ArrowDownwardOutlinedIcon /></Icon>
                            : <Icon className='pos'><ArrowUpwardOutlinedIcon /></Icon>}

                    </ComparedToLastMonth>


                </Details>
                <Styledlink to='/orders'>See all orders</Styledlink>



            </Card>


            <Card >


                <Title>EARNINGS</Title>

                <Details>
                    <Number>$2023</Number>
                    <ComparedToLastMonth>
                        <h4>12</h4>
                        <Icon className='neg'><ArrowDownwardOutlinedIcon /></Icon>
                    </ComparedToLastMonth>

                </Details>
                <Styledlink to='/netearnings'>See net earnings</Styledlink>


            </Card>



            <Card >

                <Title>MY BALANCE</Title>

                <Details>
                    <Number>$2200</Number>
                    <ComparedToLastMonth>
                        <h4>13</h4>
                        <Icon className='pos'><ArrowUpwardOutlinedIcon /></Icon>
                    </ComparedToLastMonth>

                </Details>
                <Styledlink to='/balance'>See details</Styledlink>


            </Card>




        </Container>
    )
}

export default Summary