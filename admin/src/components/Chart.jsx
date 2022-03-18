import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis,ResponsiveContainer,Tooltip } from 'recharts';
import styled from 'styled-components';


const Container = styled.div`
-webkit-box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
border-radius: 10px;
margin: 20px;
padding: 30px;

`

const Title = styled.h2`
margin-bottom: 30px;
color: rgb(187,186,187);
`


const Chart = ({title, data, dataKey, grid}) => {
    return (
        <Container>
            <Title>{title} </Title>
            <ResponsiveContainer width='100%' aspect={4 / 1}>
                <LineChart data={data}>
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd"/>
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"  /> }
                    <XAxis dataKey='name'  stroke="#5550bd" />
                    <YAxis />
                </LineChart>
            </ResponsiveContainer>



        </Container>
    )
}

export default Chart