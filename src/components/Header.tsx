import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import k from "../assets/k.svg";
import { FaShoppingCart, FaHome } from "react-icons/fa";

const HeaderContainer = styled.header`
  background-color: #333;
  padding: 10px 20px;
  color: #fff;
`;

const Logo = styled.img`
  max-width: 100%;
  transform: translateY(15%);
  height: 30px;
  object-fit: contain;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  a {
    color: #fff;
    margin-left: 15px;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CartCount = styled.span`
  background-color: #ff6347;
  border-radius: 50%;
  padding: 2px 8px;
  margin-left: 5px;
  font-size: 0.8rem;
`;

const Header: React.FC = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <HeaderContainer>
      <Nav>
        <div>
          <Link
            to="/kshop"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "1.5rem",
            }}
          >
            <Logo src={k} alt={"logo"} />
            -Shop
          </Link>
        </div>
        <NavLinks>
          <Link to="/kshop">
            <FaHome style={{ transform: "translateY(15%)" }} /> 
             {" "} Home
          </Link>
          <Link to="/kshop/cart">
            <FaShoppingCart style={{ transform: "translateY(15%)" }} /> 
             {" "} Cart
            {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
          </Link>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
