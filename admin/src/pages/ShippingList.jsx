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
import { deleteShipping, getShippings } from '../redux/apiCalls';

const Icon = styled.div`

background-color: ${(props) => (props.status === 'Delivered' && '#e5faf2') ||
        (props.status === 'Pending' && '#ebf1fe')
    };

color:   ${(props) => (props.status === 'Delivered' && '#3bb077') ||
        (props.status === 'Pending' && '#2a7ade')};      
padding: 2px 5px;
cursor: pointer;
border-radius: 10px;
height: 80%;
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

const ShippingList = () => {


    const deliveries = useSelector(state => state.shipping.shippings);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        getShippings(dispatch);

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
                        <p style={{ width: '80px' }}>{params.row.recipient}</p>
                        <UserImg src={params.row.userImg} alt="" />
                    </ActionCell>

                );
            }
        },

        {
            field: 'tracking',
            headerName: 'Tracking',
            width: 250,
            renderCell: (params) => {
                return (
                    <p><a href="https://www.fedex.com/tracking"
                        onclick="location.href=this.href+'{params.row.tracking}">{params.row.tracking}</a></p>
                );
            }

        },

        {

            field: 'createdAt',
            headerName: 'Date',
            width: 200,
            renderCell: (params) => {
                return (
                    <p>{params.row.createdAt.slice(0, 10)}</p>
                )
            }

        },
        {

            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.status === 'Pending'
                            ? <Icon status='Pending'>In Transit</Icon>
                            : <Icon status='Delivered'>Delivered</Icon>}
                    </div>
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
                            onClick={() => navigate(`/shipping/${params.row._id}`)}>
                            Edit
                        </ActionButton>

                        <DeleteOutlineOutlinedIcon
                            onClick={() => deleteShipping(params.row._id, dispatch)}
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
                        rows={deliveries}
                        components={{
                            Toolbar: CustomToolbar
                        }}
                        checkboxSelection
                        pageSize={10}
                        disableSelectionOnClick
                    />

                </Right>

            </Container>
        </div>

    )
}

export default ShippingList;