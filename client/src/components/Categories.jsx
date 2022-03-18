import  React from 'react'
import  styled from 'styled-components';
import  {categories} from '../data';
import  CategoryItem from './CategoryItem';
import  { mobile } from '../responsive';



const Container = styled.div`
display: flex;
padding: 20px;
justify-content: space-between;
${mobile({padding: '0px', flexDirection: 'column', width: '100vw' })}

`




const Categories = () => {
  return (
    <Container>
    


    {categories.map( (each) => 
    ( <CategoryItem img={each.img} item={each.title} cat={each.cat}/> ))}
    
    
    </Container>
  )
};

export default Categories;