import styled from "styled-components"
import ProductBox from "./ProductBox";


const ProductGrid = styled.div`
    margin-top:23px;
    display: grid;
    grid-template-columns:1fr 1fr;
    gap:20px;

    @media screen and (min-width: 768px) {
      grid-template-columns:1fr 1fr 1fr 1fr;
    }
`;
export default function ProductsGrid({products}) {
  return (
    <ProductGrid>
        {
            products?.length >0 && products.map((product,index)=>(
                <ProductBox key={index} {...product} />
            ))
        }
    </ProductGrid>
  )
}
