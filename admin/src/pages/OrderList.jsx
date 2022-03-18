import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { getOrders, deleteOrder } from '../redux/apiCalls';



const Button = styled.button`
background-color: ${(props) => (props.status === 'Completed' && '#e5faf2') ||
        (props.status === 'Pending' && '#ebf1fe') ||
        (props.status === 'Declined' && '#fff0f1')};

color:   ${(props) => (props.status === 'Completed' && '#3bb077') ||
        (props.status === 'Pending' && '#2a7ade') ||
        (props.status === 'Declined' && '#d95087')};       

 
 
border: none;
padding: 5px 10px;
cursor: pointer;
border-radius: 10px;

`


const Right = styled.div`
padding: 20px 20px;
`


const UserImg = styled.img`
border-radius: 50%; 
height: 30px;
width: 30px;
margin-left: 20px;

`


const ActionCell = styled.div`
align-items: center;
display: flex;
justify-content: space-between;

`
const ActionButton = styled.button`
background-color: #3bb077;
color: white;  
border-radius: 10px;
border: none;
padding: 5px 10px;
cursor: pointer;
margin-right: 20px;
`
const Container = styled.div`
flex:5;
margin-right: 30px;
`
const OrderList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.orders);

    useEffect(() => {
        getOrders(dispatch)

    }, [dispatch]);




    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const columns = [
        {
            field: 'recipient',
            headerName: 'Customer',
            width: 300,
            renderCell: (params) => {
                return (
                    <ActionCell>
                        <p style={{ width: '80px' }}>{params.row.username}</p>
                        <UserImg src={params.row.profileImg} alt="" />
                    </ActionCell>

                );
            }
        },
        {
            field: 'products',
            headerName: 'Items Quantity',
            width: 150,
            renderCell: (params) => {
                return (
                    <p>{params.row.products.length}</p>

                )
            }

        },


        {
            field: 'amount',
            headerName: 'Amount',
            width: 150,
            renderCell: (params) => {
                return (
                    <p>${params.row.amount}</p>
                );
            }

        },

        {

            field: 'createdAt',
            headerName: 'Date',
            type: 'date',
            width: 150,
            renderCell: (params) => {
                return (
                    <p>{params.row.createdAt.slice(0, 10)}</p>
                )
            }

        },
        {

            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                return (
                    <Button status={params.row.status}>{params.row.status}</Button>
                );
            }

        },

        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <ActionCell>
                        <ActionButton
                            onClick={() => navigate(`/orders/${params.row._id}`)}>
                            Edit
                        </ActionButton>

                        <DeleteOutlineOutlinedIcon
                            onClick={() => {deleteOrder(params.row._id, dispatch) }}
                            style={{ color: 'red' }} />

                    </ActionCell>
                );
            }
        }

    ];


    return (
        <div style={{ display: 'flex' }} >
            <SideBar />
            <Container>
                <NavBar />
                <Right>
                    <DataGrid
                        style={{ fontSize: '20px', height:800 }}
                        getRowId={(row) => row._id}
                        columns={columns}
                        rows={orders}
                        components={{
                            Toolbar: CustomToolbar
                        }}
                        checkboxSelection
                        pageSize={10}
                        disableSelectionOnClick
                    />

                </Right>

            </Container>
        </div >

    )
}

export default OrderList;