import React from 'react'
import styled from 'styled-components';
import { updateShipping } from '../redux/apiCalls';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
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

const Select = styled.select`


background-color: ${(props) => props.status === 'Delivered' ? '#e5faf2' : '#ebf1fe'};
color:            ${(props) => props.status === 'Delivered' ? '#3bb077' : '#2a7ade'};

border-radius: 10px; 
margin-left: 20px; 
margin-bottom: 20px;
`

const Option = styled.option.attrs(props =>
    ({ className: props.className }))`

&.Delivered {
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


const Shipping = () => {

    const location = useLocation();
    const shippingId = location.pathname.split('/')[2];
    const shipping = useSelector((state) => state.shipping.shippings.find((each) => each._id === shippingId));
    const dispatch = useDispatch();





    const handleChange = (e) => {

        updateShipping(dispatch, shipping._id, { ...shipping, status: 'Delivered' });

    };


    const columns = [
        {
            field: 'productId',
            headerName: 'Id',
            width: 250,
            renderCell: (params) => {
                return (


                    <p> {params.row.productId}</p>

                );
            },
        },

        {
            field: 'title',
            headerName: 'Product',
            width: 180,
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
            width: 140,
            renderCell: (params) => {
                return (
                    <p>${params.row.price}</p>
                )
            }
        },

        {
            field: 'color',
            headerName: 'Color',
            width: 140,
            renderCell: (params) => {
                return (
                    <p>{params.row.color}</p>
                )
            }
        },

        {
            field: 'size',
            headerName: 'Size',
            width: 140,
            renderCell: (params) => {
                return (
                    <p>{params.row.size}</p>
                )
            }
        }
    ];


    return (

        <div style={{ display: 'flex' }}>
            <SideBar />
            <Container>
                <NavBar />
                <Top>
                    <h2>Shipping Details</h2>

                </Top>
                <Bottom>
                    <Left>
                        <Person>
                            <Avatar src={shipping.userImg} />
                            <Tag>
                                <h4>{shipping.username}</h4>

                            </Tag>
                        </Person>
                        <Details>
                            <Menu>Shipping Summary</Menu>

                            <Detail>
                                <PersonOutlineOutlinedIcon />
                                <Text>{shipping.recipient}</Text>
                            </Detail>

                            <Detail>
                                <AccessTimeOutlinedIcon />
                                <Text>{shipping.createdAt.slice(0, 10)}</Text>

                            </Detail>

                            <Detail>
                                <ShoppingCartOutlinedIcon />
                                <Text>{shipping.products.length}</Text>
                            </Detail>

                            <Detail>
                                <MonetizationOnOutlinedIcon />
                                <Text>${shipping.amount}</Text>
                            </Detail>

                            <Detail>
                                <LocationOnOutlinedIcon />
                                <Text>{Object.values(shipping.address).join(', ')}</Text>
                            </Detail>

                            <Detail>
                                <PhoneAndroidOutlinedIcon />
                                <Text>{shipping.phone}</Text>
                            </Detail>

                            <Detail>
                                <EmailOutlinedIcon />
                                <Text>{shipping.email}</Text>
                            </Detail>

                            <Detail>
                                <LocalShippingOutlinedIcon />
                                <Text style={{ marginRight: '30px' }}><a href="https://www.fedex.com/tracking"
                                    onclick="location.href=this.href+'{shipping.tracking}">{shipping.tracking}</a></Text>
                                <Select status={shipping.status}
                                    name="status" id="status" onChange={handleChange} >
                                    <Option className='Delivered' selected={shipping.status === 'Delivered' && 'selected'}>Delivered</Option>
                                    <Option className='Pending' selected={shipping.status === 'Pending' && 'selected'}>In Transit</Option>
                                </Select>




                            </Detail>





                        </Details>
                    </Left>

                    <Right >
                        <h2 style={{ marginBottom: '30px' }}>Shipping Details</h2>

                        <div style={{ height: '80%' }}>

                            <DataGrid
                                getRowId={(row) => row._id}
                                columns={columns}
                                rows={shipping.products}
                                checkboxSelection
                                pageSize={8}
                            />

                        </div>


                    </Right>

                </Bottom>
            </Container >
        </div >
      
    )
}

export default Shipping;



