import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
flex:1;
margin: 30px;
height: 70vh;
position: relative;
`

const Image = styled.img`
width:100%;
height:100%;
object-fit: cover;
`

const Info = styled.div`
position: absolute;
width: 100%;
height: 100%;
top:0;
left:0;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;

`


const Title = styled.h1`
color:white;
margin-bottom: 20px;

`


const Button = styled.button`
background-color: white;
border: none;
color:gray;
cursor: pointer;
padding:10px;
font-weight: 600;

`

const CategoryItem = (props) => {
  return (
    <Container>
      <Link to={`/products/${props.cat}`}> 
      <Image src={props.img} />
      <Info>

        <Title>{props.item}</Title>
        <Button>SHOP NOW</Button>

      </Info>

     </Link>
    </Container>
  )
};

export default CategoryItem;

