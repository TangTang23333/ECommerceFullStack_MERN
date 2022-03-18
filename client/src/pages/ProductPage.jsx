import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { mobile } from '../responsive';
import { publicRequest } from '../requestMethod';
import { increaseProduct } from '../redux/cartRedux';
import { addFavorite } from '../redux/favoriteRedux';
import { useDispatch } from 'react-redux';

const Container = styled.div`

`

const Wrapper = styled.div` 

display: flex; 
padding: 50px;
${mobile({ padding: '10px', flexDirection: "column" })}



`;

const ImgContainer = styled.div`  
flex:1;

`;

const Image = styled.img`  
width: 100%;
height: 90vh;
object-fit: cover;
${mobile({ height: '40vh' })}
`;

const InfoContainer = styled.div`  
flex:1;
padding: 0 50px;
${mobile({ padding: '10px' })}
`;

const Title = styled.h1`  
font-weight: 300;
margin-bottom: 40px;
`;

const Desc = styled.p` 
margin-bottom: 40px; 
`;

const Price = styled.span`
font-weight: 100;  
font-size: 40px;
margin-bottom: 30px;
`;

const FilterContainer = styled.div`
width: 100%;
display: flex;
margin: 30px 0;
justify-content: space-between;
${mobile({ width: '100%' })}

`;

const Filter = styled.div`  
width: 45%;
display: flex;
align-items: center;

`;

const FilterTitle = styled.h3`
font-size: 18px;
font-weight: 200;  
margin-right: 10px;
`;

const FilterColor = styled.div`  
width: 13px;
height: 13px;
border-radius: 50%;
background-color: ${props => props.color};
border: 1px solid;
margin: 0 2px;
cursor: pointer;
transform: ${props => props.clicked && 'scale(1.5)'};

`;

const FilterSize = styled.select`  
padding: 5px;
margin-left: 10px;
`;

const FilterSizeOption = styled.option`  

`;

const AddContainer = styled.div`  
align-items: center;
width: 100%;
display: flex;
margin: 30px 0;
justify-content: space-between;
${mobile({ width: '100%' })}

`;

const AmountContainer = styled.div`  
display: flex;
align-items: center;
font-weight: 700;
`;

const Amount = styled.span`  
width: 30px;
height: 30px;
border-radius: 10px;
border: 1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin: 0 5px;
`;

const Button = styled.button` 
width: 40%;
padding: 15px; 
font-weight: 500;
border: 2px solid teal;
background-color: white;
cursor: pointer;

&:hover{
      background-color: #f8f4f4;
  }
`;


const ProductPage = () => {

  //find pathname in url 
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get('/products/find/' + id);

        setProduct(res.data);
      }
      catch (err) { console.log(err); }
    };

    getProduct();

  }, [id]);




  const getQuantity = (event, action) => {

    action === 'reduce'
      ? quantity > 1 && setQuantity(quantity - 1)
      : setQuantity(quantity + 1);


  };

  const handleClick = () => {
    //update cart among different components, shopping cart icon, summary etc
    console.log(size);
    dispatch(increaseProduct({ ...product, quantity, color, size, index: 0 }));


  };


  return (
    <Container>
      <Announcement />
      <NavBar />

      {/* product  */}
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.desc}
          </Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.colors?.map((each) =>
              (<FilterColor
                color={each}
                key={each}
                onClick={() => setColor(each)}
                clicked={color === each ? true : false}
              />)
              )}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(event) => setSize(event.target.value)}>

                <FilterSizeOption selected>Choose here</FilterSizeOption>
                {product.sizes?.map((each) =>
                (<FilterSizeOption
                  key={each}
                >
                  {each}
                </FilterSizeOption>))}

              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveOutlinedIcon onClick={(e) => getQuantity(e, 'reduce')} />
              <Amount>{quantity}</Amount>
              <AddOutlinedIcon onClick={(e) => getQuantity(e, 'add')} />
            </AmountContainer>
            <Button onClick={(e) => handleClick()}>ADD TO CART</Button>
            <FavoriteBorderOutlinedIcon
              onClick={() => dispatch(addFavorite({ ...product, size, color, index: 0 }))}  >
            </FavoriteBorderOutlinedIcon>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />

    </Container>
  )
}

export default ProductPage;