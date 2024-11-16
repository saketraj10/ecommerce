import Link from "next/link";
import styled from "styled-components";
import { CartContext, useCartContext } from "./CartContext";
import Center from "./Center";
import BarsIcon from "./icons/BarsIcon";
import { useState } from "react";
const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: #fff;
  position:relative;
  z-index: 3;
`;

const StyleNav = styled.nav`
${
    props=>props.navActive ? 
    `
    display:block;
    z-index:1;
    `
    :
    
    `
    display:none;
    `
}
  gap: 15px;
  position: fixed;
  padding:70px 20px 20px;
  top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #222;
  @media screen and (min-width: 768px){
    display: flex;
    position: static;
    padding:0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px){

    padding:0;
  }
`;

const NavButton = styled.button`
    background-color: transparent;
    width:30px;
    height:30px;
    border: 0;
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 4;
    @media screen and (min-width: 768px){
        display: none;
    }
`;
export default function Header() {
  const { cartProducts } = useCartContext();
  const [navActive,setNavActive] = useState(false)

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyleNav navActive={navActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts?.length})</NavLink>
          </StyleNav>
          <NavButton onClick={()=>setNavActive(prev=>!prev)}>
            <BarsIcon/>
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
