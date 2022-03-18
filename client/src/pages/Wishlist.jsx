import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { mobile } from "../responsive";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { removeFavorite } from '../redux/favoriteRedux';
import {increaseProduct} from '../redux/cartRedux';
import { useDispatch } from 'react-redux';





const Container = styled.div`

`;

const Wrapper = styled.div`
${mobile({ padding: '10%' })}
`;


const Title = styled.h1`
text-align: center;
margin: 20px 0;
font-weight: 300;
`;

const Top = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
`;


const TopButton = styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
border: ${(props) => props.type === "filled" && "none"};
background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
color: ${(props) => props.type === "filled" && "white"};

`;

const TopTexts = styled.div`
${mobile({ display: 'none' })}


`

const TopText = styled.span`
text-decoration: underline;
cursor: pointer;
margin: 0 10px;

`;

const Bottom = styled.div`
display: flex;
justify-content: space-between;
${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
flex:3;
`;

const Product = styled.div`
display: flex;
justify-content: space-between;
${mobile({ flexDirection: 'column' })}


 
`;

const ProductDetail = styled.div`
display: flex;
flex:2;



`;

const Image = styled.img`
width: 200px;

`;

const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;

`;

const ProductName = styled.span`
`;

const ProductId = styled.span`
`;


const PriceDetail = styled.div`
flex:1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
`;

const ProductPrice = styled.h2`
font-weight: 200;
font-size: 30px;
${mobile({ marginBottom: '20px' })}

`;


const ProductColor = styled.div`
background-color: ${props => props.color};
height:20px;
width:20px;
border-radius: 50%;
border: 1px solid;
`;


const ProductSize = styled.span`
`;


const Button = styled.button`
width: 100px;
padding: 5px;
font-weight: 200;
color: white;
background-color: black;
cursor: pointer;

`;


const Wishlist = () => {

    const wishlist = useSelector(state => state.favorite);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    return (
        <Container>
            <NavBar />
            <Announcement />


            <Wrapper>
                <Title>YOUR WISHLIST</Title>
                <Top>
                    <TopButton
                    onClick={()=>navigate('/')} >CONTINUE SHOPPING</TopButton>

                    <TopTexts>
                    <Link to='/cart' >
                        <TopText>Shopping Bag({cart.totalQuantity})</TopText></Link>
                        <TopText>Wishlist({wishlist.products.length})</TopText>
                    </TopTexts>
                    <Link to='/cart' >
                    <TopButton type='filled'>
                    CHECKOUT NOW</TopButton></Link>
                </Top>

                <Bottom>
                    <Info>
                        {wishlist.products.map((each) => (
                            <Product>
                                <ProductDetail>
                                    <Image src={each.img} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {each.title}
                                        </ProductName>
                                        
                                        <ProductId>
                                            <b>ID:</b> {each._id}
                                        </ProductId>
                                        <ProductColor color={each.color} />
                                        <ProductSize>
                                            <b>Size:</b>  {each.size}
                                        </ProductSize>

                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                <ProductPrice> $ {each.price}</ProductPrice>
                                <Button onClick={() => dispatch(increaseProduct({...each, index: 0, quantity: 1}))}> Add To Cart </Button>
                                <Button onClick={() => dispatch(removeFavorite(each))}> Remove </Button>
                                </PriceDetail>
                            </Product>)
                        )}

                    </Info>

                </Bottom>
            </Wrapper>
            <Footer />
        </Container>

    )
}

export default Wishlist;