import styled from 'styled-components';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import { useEffect } from 'react'


import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../redux/apiCalls';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';


const ProductInfo = styled.div`
display: flex;
align-items: center;
`

const ActionCell = styled.div`
align-items: center;
display: flex;

`

const Right = styled.div`
padding: 20px 20px;
`

const ProductImg = styled.img`
border-radius: 50%; 
height: 30px;
width: 30px;
margin-right: 20px;
border: 1px solid lightgrey;

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
const Container = styled.div`
flex:5;
margin-right: 30px;
`


const ProductList = () => {

    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        getProducts(dispatch)

    }, [dispatch]);



    const columns = [
        {
            field: '_id',
            headerName: 'Id',
            width: 350,
        },

        {
            field: 'title',
            headerName: 'Product',
            width: 350,
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
            field: 'inStock',
            headerName: 'Stock',
            width: 180
        },
        {
            field: 'active',
            headerName: 'Active',
            width: 180
        },

        {
            field: 'price',
            headerName: 'Price',
            width: 180,
            renderCell: (params) => {
                return (
                    <p>${params.row.price}</p>
                )
            }
        },

        {
            field: 'action',
            headerName: 'Action',
            width: 180,
            renderCell: (params) => {
                return (
                    <ActionCell>
                        <Button onClick={() => { navigate(`/products/${params.row._id}`) }}>Edit</Button>
                        <DeleteOutlineOutlinedIcon
                            style={{ color: 'red' }}
                            onClick={() => { deleteProduct(params.row._id, dispatch) }} />
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
                        style={{ fontSize: '20px', height:800 }}
                        getRowId={(row) => row._id}
                        columns={columns}
                        rows={products}
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

export default ProductList;