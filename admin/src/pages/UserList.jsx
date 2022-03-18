import styled from 'styled-components';
import React, { useState, useEffect } from 'react'
import pic from './Profile.png';
import { useSelector, useDispatch } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import { format } from 'timeago.js';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../redux/apiCalls';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';



const Container = styled.div`
flex:5;
margin-right: 30px;

`


const Right = styled.div`

padding: 20px 20px;


`

const UserInfo = styled.div`
display: flex;
align-items: center;
`

const ActionCell = styled.div`
align-items: center;
display: flex;

`

const UserImg = styled.img`
border-radius: 50%; 
height: 30px;
width: 30px;
margin-right: 20px;

`

const Button = styled.button`
background-color: #3bb077;
color: white;  
border-radius: 10px;
border: none;
padding: 5px 10px;
cursor: pointer;
margin-right: 20px;
`




const UserList = () => {

    const users = useSelector(state => state.user.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getUsers(dispatch)

    }, [dispatch]);

    const columns = [
        {
            field: '_id',
            headerName: 'Id',
            width: 350,
        },

        {
            field: 'username',
            headerName: 'User',
            width: 280,
            renderCell: (params) => {
                return (
                    <UserInfo>
                        <UserImg src={pic} alt="" />
                        <p> {params.row.username}</p>
                    </UserInfo>
                );
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300
        },
        {
            field: 'createdAt',
            headerName: 'Registration Date',
            width: 230,
            renderCell: (params) => {
                return (
                    <p>{format(params.row.createdAt)}</p>
                )
            }

        }
        ,

        {
            field: 'action',
            headerName: 'Action',
            width: 280,
            renderCell: (params) => {
                return (
                    <ActionCell>
                        <Button
                            onClick={() => navigate(`/users/${params.row._id}`)}>
                            Edit
                        </Button>

                        <DeleteOutlineOutlinedIcon
                            onClick={() => { deleteUser(params.row._id, dispatch) }}
                            style={{ color: 'red' }} />
                    </ActionCell>
                );
            }
        },


    ];




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
    return (
        <div style={{ display: 'flex' }} >
            <SideBar />
            <Container>
                <NavBar />
                <Right>
                    <DataGrid
                    style={{fontSize: '20px', height:800}}
                        getRowId={(row) => row._id}
                        columns={columns}
                        rows={users}
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

export default UserList;