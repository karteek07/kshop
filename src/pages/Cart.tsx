import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { CartItem as CartItemType } from "../types";

const Container = styled.div`
  padding: 20px;
`;

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-right: 20px;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h3`
  margin: 0 0 5px 0;
`;

const ProductPrice = styled.p`
  margin: 0;
  color: #2ecc71;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;

  button {
    padding: 5px 10px;
    background-color: #3498db;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 5px;

    &:hover {
      background-color: #2980b9;
    }

    &:disabled {
      background-color: #95a5a6;
      cursor: not-allowed;
    }
  }
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  background-color: #e74c3c;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const Total = styled.h2`
  text-align: right;
  margin-top: 20px;
`;

const CheckoutButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  float: right;

  &:hover {
    background-color: #1e8449;
  }
`;

const ClearCartButton = styled.button`
  padding: 10px 20px;
  background-color: #95a5a6;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  margin-right: 10px;

  &:hover {
    background-color: #7f8c8d;
  }
`;

const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <Container>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/">Go Back to Home</Link>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Your Cart</h1>
      {cart.map((item: CartItemType) => (
        <CartItemContainer key={item.id}>
          <ProductImage src={item.image} alt={item.title} />
          <ProductDetails>
            <ProductTitle>{item.title}</ProductTitle>
            <ProductPrice>₹{(item.price * 82).toFixed(2)}</ProductPrice>
          </ProductDetails>
          <QuantityControl>
            <button
              onClick={() => decreaseQuantity(item.id)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </QuantityControl>
          <RemoveButton onClick={() => removeFromCart(item.id)}>
            Remove
          </RemoveButton>
        </CartItemContainer>
      ))}
      <Total>Total: ₹{(totalPrice * 82).toFixed(2)}</Total>
      <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
      <ClearCartButton onClick={clearCart}>Clear Cart</ClearCartButton>
    </Container>
  );
};

export default Cart;
