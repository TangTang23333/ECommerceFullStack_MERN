import styled from 'styled-components';
import Product from "./Product";
import { useEffect, useState } from 'react';
import axios from "axios";


const Container = styled.div`  
display: flex;
padding:20px;
flex-wrap: wrap;

`



const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  

  // handle cat 
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );

        setProducts(res.data);
      } catch (err) { }
    };
    getProducts();
  }, [cat]);


  // handle filters 
  useEffect(() => {

   
    if (filters) {
      
      let filtered = products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      );
        setFilteredProducts(filtered);
      } 
    

  }, [products, cat, filters]);


  // handle sort 
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);


  
  return (
    <Container>

      {filteredProducts.map((item) => {
        return <Product item={item} key={item._id} />
      })}

    </Container>
  )
}

export default Products;