import React, { useState } from 'react'
import styled from 'styled-components';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addShipping, updateOrder } from '../redux/apiCalls';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { format } from 'timeago.js';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import {
    DataGrid
} from '@mui/x-data-grid';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';



const Container = styled.div`
padding: 20px; 
justify-content: center;
flex:6;
`

const Bottom = styled.div`
display: flex;
justify-content: space-between;
margin-right: 30px;`

const Left = styled.div`
flex: 1;
margin-right: 30px;
border: 2px solid lightgray;
border-radius: 10px;
padding: 30px 30px;
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
-webkit-box-shadow:0px 0px 15px -10px rgba(0,0,0,0.75); `

const Right = styled.div`
flex:3;
border: 2px solid lightgray;
border-radius: 10px;
padding: 30px 30px;
box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
-webkit-box-shadow:0px 0px 15px -10px rgba(0,0,0,0.75); `


const Top = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 30px;
align-items: center;
`

const Input = styled.input`
margin-left: 20px;
margin-bottom: 30px;
outline: 0;
border-width: 0 0 2px;
color: rgb(187,186,186);;`

const Button = styled.button`
margin-right: 30px;
font-size: 20px;
border-radius: 10px;
background-color: teal;
color: white;
padding: 5px 10px;
width: 200px;
justify-content: center;`


const Person = styled.div`
display:flex;
margin-bottom: 30px;
align-items: center;
`

const Details = styled.div`
padding: 10px 10px;
`

const Detail = styled.div`
margin-bottom: 20px;
display: flex;
margin-top: 20px;


`

const Avatar = styled.img`
height:80px;
width: 80px;
border-radius: 50%;
border: 1px solid lightgray;
`

const Tag = styled.div`
flex-direction: column;
display: flex;
margin-left: 30px;
font-size: 23px;

`

const Menu = styled.h3`
color: rgb(187,186,186);
margin-bottom: 40px;;
`

const Text = styled.span` 
margin-left: 20px;
margin-bottom: 20px;
`

const ProductInfo = styled.div`
display: flex;
align-items: center;
`

const ProductImg = styled.img`
border-radius: 50%; 
height: 30px;
width: 30px;
margin-right: 20px;
border: 1px solid lightgrey;

`

const ShippingIcon = styled.div.attrs(props =>
    ({ className: props.className }))`
    &.Shipped {
    background-color: #e5faf2;
    color: #3bb077;
}

&.Completed {
    background-color: #e5faf2;
    color: #3bb077;
}

&.Pending {
    background-color: #ebf1fe;
    color: #2a7ade;}

padding: 3px 5px;
cursor: pointer;
border-radius: 10px;
`


const Option = styled.option.attrs(props =>
    ({ className: props.className }))`

&.Declined {
    background-color: #fff0f1;
    color: #d95087;
}

&.Completed {
    background-color: #e5faf2;
    color: #3bb077;
}

&.Pending {
    background-color: #ebf1fe;
    color: #2a7ade;}

padding: 3px 5px;
cursor: pointer;
border-radius: 10px;
`


const Select = styled.select`
background-color: ${(props) => (props.status === 'Completed' && '#e5faf2') ||
        (props.status === 'Pending' && '#ebf1fe') ||
        (props.status === 'Declined' && '#fff0f1')};

color:   ${(props) => (props.status === 'Completed' && '#3bb077') ||
        (props.status === 'Pending' && '#2a7ade') ||
        (props.status === 'Declined' && '#d95087')};       
border-radius: 10px; 
margin-left: 20px; 
margin-bottom: 20px;
`

const Order = () => {

    const location = useLocation();
    const orderId = location.pathname.split('/')[2];
    const navigate = useNavigate();
    const order = useSelector((state) => state.order.orders.find((each) => each._id === orderId));
    const dispatch = useDispatch();
    const [trackNumber, setTrackNumber] = useState('');
    const [newOrder, setNewOrder] = useState([]);
    const [shipped, setShipped] = useState([]);


    const handleChange = (e) => {

        updateOrder(dispatch, order._id, { ...order, status: e.target.value });

    };



    const handleShipping = () => {

        // created shipping slice, post shipping to DB
        addShipping(dispatch,
            {
                products: shipped,
                userId: order.userId,
                username: order.username,
                recipient: order.recipient,
                userImg: order.profileImg,
                amount: shipped.reduce((partialSum, a) => partialSum + a.price * a.quantity, 0),
                address: order.address,
                tracking: trackNumber,
                phone: order.phone,
                email: order.email


            });

        // update shipped product status to shipped 
        updateOrder(dispatch, order._id, { ...order, products: newOrder });

        // navigate to new shipping page 
        navigate('/shipping');
    };

    const columns = [
        {
            field: '_id',
            headerName: 'Id',
            width: 230,
        },

        {
            field: 'title',
            headerName: 'Product',
            width: 280,
            renderCell: (params) => {
                return (
                    <ProductInfo>
                        <ProductImg src={params.row.img} alt="" />
                        <p> {params.row.title}</p>
                    </ProductInfo>
                );
            },
        },

        {
            field: 'price',
            headerName: 'Price',
            width: 100,
            renderCell: (params) => {
                return (
                    <p>${params.row.price}</p>
                )
            }
        },

        {
            field: 'color',
            headerName: 'Color',
            width: 100,
            renderCell: (params) => {
                return (
                    <p>{params.row.color}</p>
                )
            }
        },

        {
            field: 'size',
            headerName: 'Size',
            width: 100,
            renderCell: (params) => {
                return (
                    <p>{params.row.size}</p>
                )
            }
        },

        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                return (

                    params.row.status === 'Shipped' ? (<ShippingIcon className='Shipped'> Shipped </ShippingIcon>) : (<ShippingIcon className='Pending'> Pending</ShippingIcon>)



                );
            }

        },


    ];



    return (

        <div style={{ display: 'flex' }}>
            <SideBar />




            <Container>
                <NavBar />
                <Top>
                    <h2>Order Details</h2>
                    <Button onClick={() => { navigate('/orders/create') }}>Create</Button>
                </Top>
                <Bottom>
                    <Left>
                        <Person>
                            <Avatar src={order.profileImg} />
                            <Tag>
                                <h4>{order.username}</h4>
                                <span style={{ fontSize: '16px', marginTop: '8px' }}>since {order.createdAt.slice(0, 10)}</span>
                            </Tag>
                        </Person>
                        <Details>
                            <Menu>Order Summary</Menu>

                            <Detail>
                                <PersonOutlineOutlinedIcon />
                                <Text>{order.recipient}</Text>
                            </Detail>

                            <Detail>
                                <AccessTimeOutlinedIcon />
                                <Text>{format(order.createdAt)}</Text>

                            </Detail>

                            <Detail>
                                <ShoppingCartOutlinedIcon />
                                <Text>{order.products.length}</Text>
                            </Detail>

                            <Detail>
                                <MonetizationOnOutlinedIcon />
                                <Text>${order.amount}</Text>
                            </Detail>

                            <Detail>
                                <LocationOnOutlinedIcon />
                                <Text>{Object.values(order.address).join(', ')}</Text>
                            </Detail>

                            <Detail>
                                <PhoneAndroidOutlinedIcon />
                                <Text>{order.phone}</Text>
                            </Detail>

                            <Detail>
                                <EmailOutlinedIcon />
                                <Text>{order.email}</Text>
                            </Detail>

                            <Detail>
                                <DeliveryDiningOutlinedIcon />
                                <Input name='tracking' onChange={(e) => { setTrackNumber(e.target.value) }} placeholder="123456789" />
                            </Detail>



                            <Detail>
                                <LocalShippingOutlinedIcon />
                                <Select
                                    status={order.status} onChange={handleChange} >
                                    <Option className='Completed' value="Completed" selected={order.status === 'Completed' && 'selected'}>Completed</Option>
                                    <Option className='Pending' value="Pending" selected={order.status === 'Pending' && 'selected'}>Pending</Option>
                                    <Option className='Declined' value="Declined" selected={order.status === 'Declined' && 'selected'}>Declined</Option>
                                </Select>
                            </Detail>







                        </Details>
                    </Left>

                    <Right >
                        <h2 style={{ marginBottom: '30px' }}>Order Details</h2>

                        <div style={{ height: '80%' }}>

                            <DataGrid
                                getRowId={(row) => row._id}
                                columns={columns}
                                rows={order.products}
                                checkboxSelection
                                pageSize={8}
                                onSelectionModelChange={(ids) => {

                                    const updated = [];
                                    const selected = [];
                                    order.products.forEach((product) => {
                                        console.log(product);
                                        if (ids.includes(product._id)) {
                                            updated.push({ ...product, status: 'Shipped' });
                                            selected.push({ ...product, status: 'Shipped' });

                                        } else {
                                            console.log(product._id, product.status)
                                            updated.push({ ...product });
                                        }

                                    });

                                    console.log('shipped:', shipped);
                                    console.log('updated order:', updated);
                                    setNewOrder(updated);
                                    setShipped(selected);


                                }}

                            />

                        </div>

                        <Button style={{ marginTop: '30px' }}
                            onClick={handleShipping}>Create Shipping</Button>
                    </Right>

                </Bottom>
            </Container>
       
        </div >
    )
}

export default Order;



