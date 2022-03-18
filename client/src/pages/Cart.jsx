import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { mobile } from "../responsive";
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest, publicRequest } from '../requestMethod';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { increaseProduct, removeProduct, decreaseProduct, clearCart, updateProductSize, updateProductColor } from '../redux/cartRedux';
import { color } from '@mui/system';
const KEY = 'pk_test_51KTFHZH40wApZWjZchG918FNSXgSe7VH6wUH0lbsbPIg49LG4GmtajNgeGpFz3XJouwatSNDOUTvR3iuobQUxi7V0068MCVsro';




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

const ProductColor = styled.div`
display: flex;

`;

const ProductColorDot = styled.div`
background-color: ${props => props.color};
height:20px;
width:20px;
border-radius: 50%;
border: 1px solid;
margin-right: 20px;
`

const ProductSize = styled.div`
`;


const PriceDetail = styled.div`
flex:1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;


const ProductAmountContainer = styled.div`  
display: flex;
align-items: center;
font-weight: 400;
margin-bottom: 20px;
`;


const ProductAmount = styled.div`  
margin: 5px;
font-size:25px;
${mobile({ margin: '5px 15px' })}
`;


const ProductPrice = styled.h2`
font-weight: 200;
font-size: 30px;
${mobile({ marginBottom: '20px' })}

`;


const Summary = styled.div`
flex:1;
padding: 20px;
height:60vh;
border-radius: 10px;
border: 0.5px solid lightgray;
`;

const SummaryTitle = styled.h1`
font-weight: 200;
`;

const SummaryItem = styled.p`
margin: 30px 0;
display: flex;
justify-content: space-between;
font-weight: ${props => props.type === 'total' && '500'};
font-size: ${props => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span`

`;

const SummaryItemPrice = styled.span`

`;

const Button = styled.button`
width: 100%;
padding: 10px;
font-weight: 600;
color: white;
background-color: black;
cursor: pointer;
`;


const ClearButton = styled.button`
padding: 10px;
font-weight: 600;
color: white;
background-color: black;
cursor: pointer;
margin-top: 20px;
margin-left: 600px;
`


const ClearItemButton = styled.button`
padding: 10px;
font-weight: 600;
color: white;
background-color: black;
cursor: pointer;
margin-bottom:15px;
`
// const Hr = styled.hr`
// background-color: #eee;
// border:none;
// height:1px;
// `
const FilterSize = styled.select`  
padding: 5px;

`;

const FilterSizeOption = styled.option`  

`;

const FilterColor = styled.select`  
padding: 5px;

`;


const FilterColorOption = styled.option`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props => props.color};
border: 1px solid;
margin: 0 5px;
cursor: pointer;
transform: ${props => props.clicked && 'scale(1.5)'};
color: ${props => props.color !== 'white' && 'white'};

`
const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const favorite = useSelector(state => state.favorite);

    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    };



    //handle online payment 
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.totalAmount * 100
                });

                console.log('status:', res.data);
                res.statusCode === 200 && dispatch(clearCart());
                navigate('/success',
                    {
                        state:
                        {
                            stripeData: res.data,
                            cart: cart
                        }
                    });

            } catch (err) {
                console.log(err);
            }
        };
        stripeToken && makeRequest();
    },
        // dependancy 
        [stripeToken, cart.total, cart.products, cart, dispatch, navigate]);

    // handle user add or remove product from cart page and
    const handleQuantity = (event, product, action) => {


        event.preventDefault();


        action === '+'
            ? dispatch(increaseProduct(product))
            : dispatch(decreaseProduct(product));

    };



    return (
        <Container>
            <NavBar />
            <Announcement />


            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton onClick={() => navigate('/')} >CONTINUE SHOPPING</TopButton>

                    <TopTexts>
                        <TopText
                            onClick={() => navigate('/cart')}>
                            Shopping Bag({cart.totalQuantity})
                        </TopText>
                        <TopText
                            onClick={() => navigate('/wishlist')}>
                            Wishlist({favorite.products.length})
                        </TopText>
                    </TopTexts>
                    <TopButton type='filled'>CHECKOUT NOW</TopButton>
                </Top>

                <Bottom>
                    <Info>
                        {cart.products.map((each, index) => (
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
                                        <ProductColor>
                                            <ProductColorDot color={each.color}></ProductColorDot>
                                            <FilterColor
                                                onChange={(event) => dispatch(updateProductColor({ ...each, color: event.target.value, index: index }))}>
                                                {/* <FilterColorOption selected color={each.color}> {each.color} </FilterColorOption> */}
                                                {each.colors.map((color) =>
                                                (<FilterColorOption
                                                    selected={color === each.color ? 'selected' : null}
                                                    color={color}
                                                    key={color}>
                                                    {color}
                                                </FilterColorOption>)
                                                )}
                                            </FilterColor>
                                        </ProductColor>


                                        <ProductSize>

                                            <FilterSize
                                                onChange={(event) => dispatch(updateProductSize({ ...each, size: event.target.value, index: index }))}>

                                                {/* <FilterSizeOption selected>{each.size}</FilterSizeOption> */}
                                                {each.sizes.map((size) =>

                                                (<FilterSizeOption
                                                    selected={size === each.size ? 'selected' : null}
                                                    key={size}
                                                    value={size}
                                                >
                                                    {size}
                                                </FilterSizeOption>)
                                                )}
                                            </FilterSize>
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ClearItemButton onClick={() => dispatch(removeProduct(each))}> Remove </ClearItemButton>
                                    <ProductAmountContainer>
                                        <AddOutlinedIcon
                                            onClick={(event) => handleQuantity(event, each, '+')}
                                        />
                                        <ProductAmount> {each.quantity}</ProductAmount>
                                        <RemoveOutlinedIcon
                                            onClick={(event) => handleQuantity(event, each, '-')} />


                                    </ProductAmountContainer>
                                    <ProductPrice> {each.price * each.quantity}</ProductPrice>
                                </PriceDetail>
                            </Product>)
                        )}

                        <ClearButton onClick={() => dispatch(clearCart())}> Clear Cart</ClearButton>

                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>{cart.totalAmount}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 7.99</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -7.99</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>{cart.totalAmount}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name='TT shop'
                            imgae='https://img.joomcdn.net/e0abc88e0a87b6e5c80ee83085aa02d481730abb_original.jpeg'
                            billingAddress
                            shippingAddress
                            description={`Your total is ${cart.totalAmount}`}
                            amount={cart.totalAmount * 100}
                            token={onToken}
                            stripeKey={KEY}>

                            <Button> Checkout Now</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>

            </Wrapper>
            <Footer />
        </Container>

    )
}

export default Cart;