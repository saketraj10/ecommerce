import styled from "styled-components"
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
    font-size:3.5rem;
    font-weight:100;
    margin:0;
`;
export default function NewProducts({newProducts}) {
  return (
    
    <Center>
    <Title>New Arrivals</Title>
   <ProductsGrid products={newProducts}/>
    </Center>
  )
}
