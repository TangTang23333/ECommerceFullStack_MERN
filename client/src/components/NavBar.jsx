import React, { useState } from 'react'
import styled from 'styled-components';
import Badge from '@mui/material/Badge';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { persistor } from '../redux/store';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import axios from 'axios';
// styled.element name 
const Container = styled.div`
        height: 60px;
        ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
padding: 10px 20px;
display: flex;
justify-content:space-between;
align-items: center;
${mobile({ padding: '10px 0' })}
`

const Left = styled.div`
flex:1;
display:flex;
align-items: center;
`

const Language = styled.span`
font-size: 14px;
${mobile({ display: 'none' })};
`

const SearchContainer = styled.div`
border: 1px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;


`

const Input = styled.input`
border: none;
${mobile({ width: '50px' })};
`

const Center = styled.div`
flex:1;
text-align:center;
`

const Logo = styled.h1`
font-weight: bold;
cursor: pointer;
${mobile({ fontSize: '24px' })};
`

const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content:flex-end;
${mobile({ flex: 2, justifyContent: "center" })}
`

const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

function NavBar() {
    const cart = useSelector(state => state.cart);
    const favorite = useSelector(state => state.favorite);
    const user = useSelector(state => state.user.currentUser);



    const [query, setQuery] = useState();
    let navigate = useNavigate();

    let baseUrl = user
        ? axios.create({
            baseURL: 'http://localhost:5000/api/',
            headers: {
                'token': `Bearer ${user.accessToken}`,
                "Content-Type": "application/json"
            }
        })
        : axios.create({
            baseURL: 'http://localhost:5000/api/'
        }
        );






    const handleSignOut = (e) => {

        e.preventDefault();

        // write remaining cart and favorite to DB 

        if (!user) {
            window.alert('You need tp register or login first!!');

        }

        else {
            const saveUserCart = async () => {

                const response = await baseUrl.get(`/carts/find/${user._id}`);


                try {

                    if (response.data.length > 0) {
                        const cartRes = baseUrl.put(`/carts/${response.data[0]._id}`, {
                            _id: cart._id,
                            userId: user._id,
                            products: cart.products.map((each) => (
                                {
                                    productId: each._id,
                                    quantity: each.quantity,
                                    size: each.size,
                                    color: each.color,
                                    price: each.price,
                                    title: each.title,
                                    img: each.img,
                                    sizes: each.sizes,
                                    colors: each.colors,
                                    index: each.index
                                }

                            )),
                            totalAmount: cart.totalAmount,
                            totalQuantity: cart.totalQuantity
                        });

                        console.log('update cart before log out:', cartRes);

                    } else {
                        const cartRes = baseUrl.post(`/carts/`, {
                            userId: user._id,
                            products: cart.products.map((each) => (
                                {
                                    productId: each._id,
                                    quantity: each.quantity,
                                    size: each.size,
                                    color: each.color,
                                    price: each.price,
                                    title: each.title,
                                    img: each.img,
                                    sizes: each.sizes,
                                    colors: each.colors,
                                    index: each.index
                                })),

                            totalAmount: cart.totalAmount,
                            totalQuantity: cart.totalQuantity


                        });
                        console.log('write new cart before log out:', cartRes);
                    }

                } catch (err) {
                    console.log(err);
                }
            };

            const saveUserFavorite = async () => {
                const response = await baseUrl.get(`/favorites/find/${user._id}`);

                // write remaining cart and favorite to DB 

                try {

                    if (response.data.length > 0) {
                        const favoriteRes = baseUrl.put(`/favorites/${response.data[0]._id}`, {
                            _id: favorite._id,
                            userId: user._id,
                            products: favorite.products.map((each) => (
                                {
                                    productId: each._id,
                                    size: each.size,
                                    color: each.color,
                                    price: each.price,
                                    title: each.title,
                                    img: each.img,
                                    sizes: each.sizes,
                                    colors: each.colors,
                                    index: each.index
                                }

                            ))

                        });

                        console.log('update favorite before log out:', favoriteRes);

                    } else {
                        const favoriteRes = baseUrl.post(`/favorites/`, {
                            userId: user._id,
                            products: favorite.products.map((each) => (
                                {
                                    productId: each._id,
                                    size: each.size,
                                    color: each.color,
                                    price: each.price,
                                    title: each.title,
                                    img: each.img,
                                    sizes: each.sizes,
                                    colors: each.colors,
                                    index: each.index
                                }
                            ))

                        });
                        console.log('write new favorite before log out:', favoriteRes);
                    }

                } catch (err) {
                    console.log(err);
                }
            };


            const logOut = async () => {
                await saveUserCart();
                await saveUserFavorite();
                // now wait for saveUser to finish...
                // and wipe all states 
                persistor.purge().then(() => window.location.reload(false));
            };

            logOut();
        }


    }
    return (

        <Container>
            <Wrapper>
                <Left>
                    <Language> EN</Language>
                    <SearchContainer>

                        <Input placeholder='Search'
                            onChange={(e) => { setQuery(e.target.value) }}
                        />
                        <Link to={`/products/${query}`} >
                            <SearchOutlinedIcon
                                style={{ color: 'lightgray', fontSize: 16 }} />
                        </Link>
                    </SearchContainer>


                </Left>


                <Center>

                    <Logo onClick={() => navigate('/')}>
                        TT
                    </Logo>

                </Center>


                <Right>



                    <MenuItem
                        onClick={() => navigate('/register')}> REGISTER</MenuItem>
                    <MenuItem
                        onClick={() => navigate('/login')}> SIGN IN</MenuItem>
                    <Link to="/cart" >
                        <MenuItem>
                            <Badge badgeContent={cart.totalQuantity} color='primary'>
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Link>

                    <Link to="/wishlist" >
                        <MenuItem>
                            <Badge badgeContent={favorite.products.length} color='primary'>
                                <FavoriteBorderIcon />
                            </Badge>
                        </MenuItem>
                    </Link>


                    <MenuItem>
                        <form method='post' type='submit' onClick={handleSignOut}  >
                            <ExitToAppOutlinedIcon />
                        </form>
                    </MenuItem>



                </Right>


            </Wrapper>
        </Container>
    );

}

export default NavBar;

